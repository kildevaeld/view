import {
    IHandlerFunc, IActivator, IDependencyResolver, MetaKeys,
    IContainer, getFunctionParameters, emptyParameters,
} from './common';
import { DIError, createError, DIBadKeyError } from './errors';
import { ClassActivator } from './activators';
import { Resolver } from './resolvers';
import { factory } from './decorators';

var counter = 0;
function genid() {
    return ++counter + "";
}

export interface ConstructionInfo {
    activator: IActivator
    keys?: string[]
    dependencyResolver?: IDependencyResolver
}


export class Container implements IActivator, IContainer, IDependencyResolver {

    private entries: Map<any, IHandlerFunc[]>;
    private constructionInfo: Map<Function, ConstructionInfo>;

    readonly parent?: Container;
    readonly id: string;

    constructor(info?: Map<Function, ConstructionInfo>, parent?: Container) {
        this.entries = new Map<any, IHandlerFunc[]>();
        this.constructionInfo = info || new Map<Function, ConstructionInfo>();
        this.id = genid();
        this.parent = parent;
    }

    get root(): IContainer {
        let root: IContainer = this, tmp: IContainer | undefined = root
        while (tmp) {
            tmp = root.parent
            if (tmp) root = tmp
        }
        return root
    }

    makeGlobal() {
        makeGlobal(this);
    }

    /**
    * Inspects the container to determine if a particular key has been registred.
    *
    * @method hasHandler
    * @param {Object} key The key that identifies the dependency at resolution time; usually a constructor function.
    * @param {Boolean} [checkParent=false] Indicates whether or not to check the parent container hierarchy.
    * @return {Boolean} Returns true if the key has been registred; false otherwise.
    */
    public hasHandler(key: any, checkParent: boolean = false): boolean {
        if (key === null || key === undefined) {
            throw new DIBadKeyError();
        }


        return !!(this.entries.has(key)
            || (checkParent && this.parent && this.parent.hasHandler(key, checkParent)));
    }

    /**
    * Registers a type (constructor function) by inspecting its registration annotations. If none are found, then the default transient registration is used.
    *
    * @method autoRegister
    * @param {Function} fn The constructor function to use when the dependency needs to be instantiated.
    * @param {Object} [key] The key that identifies the dependency at resolution time; usually a constructor function.
    */
    autoRegister(fn: any, key?: any, targetKey?: string, resolveIn?: IContainer): void {
        var registration;
        let container = resolveIn || this;
        if (fn === null || fn === undefined) {
            throw new DIBadKeyError('no key');
        }
        if (typeof fn === 'function') {

            registration = Reflect.getOwnMetadata(MetaKeys.registration, fn, targetKey!) // Metadata.get(Metadata.registration, fn, targetKey);

            if (registration !== undefined) {
                registration.register(container, key || fn, fn);
            } else {
                container.registerTransient(key || fn, fn, targetKey);
            }
        } else {
            container.registerInstance(fn, fn);
        }
    }

    /**
    * Unregisters based on key.
    *
    * @method unregister
    * @param {Object} key The key that identifies the dependency at resolution time; usually a constructor function.
    */
    unregister(key: any): void {
        //debug('%s: Unregister key: %s', this.id, key);
        this.entries.delete(key);
    }



    /**
    * Resolves a single instance based on the provided key.
    * If the key is not found, the container will try to auto resolve it.
    *
    * @method get
    * @param {Object} key The key that identifies the object to resolve.
    * @return {Object} Returns the resolved instance.
    */
    get<T>(key: any, targetKey?: string, resolveIn?: IContainer): T {
        //debug("%s: Get %s, target: %s", this.id, String(key), targetKey);
        var entry;

        if (key === null || key === undefined) {
            throw new DIBadKeyError();
        }

        if (key === Container) {
            return <any>this;
        }

        if (key instanceof Resolver) {
            return key.get(this);
        }

        entry = this.entries.get(key);

        if (entry !== undefined) {
            return entry[0](this);
        }



        if (this.parent && this.parent.hasHandler(key, true)) {
            //debug("%s: found key '%s' on parent", this.id, key);
            return this.parent.get<T>(key, targetKey, resolveIn);
        }

        // No point in auto registrering a string or symbol or number
        if (typeof key === 'string' || typeof key === 'symbol' || typeof key === 'number') {
            throw createError('DIResolveError', 'no component registered for key: ' + String(key));
        }

        this.autoRegister(key, null, targetKey, resolveIn);
        entry = this.entries.get(key);

        return entry![0](this);
    }

    /**
    * Resolves all instance registered under the provided key.
    *
    * @method getAll
    * @param {Object} key The key that identifies the objects to resolve.
    * @return {Object[]} Returns an array of the resolved instances.
    */
    getAll(key: any): any[] {
        var entry;

        if (key === null || key === undefined) {
            throw new DIBadKeyError();
        }

        entry = this.entries.get(key);

        if (entry !== undefined) {
            return entry.map(x => x(this));
        }

        if (this.parent) {
            return this.parent.getAll(key);
        }

        return [];
    }

    /**
    * Creates a new dependency injection container whose parent is the current container.
    *
    * @method createChild
    * @return {Container} Returns a new container instance parented to this.
    */
    createChild(): IContainer {
        const childContainer = Reflect.construct(this.constructor, [this.constructionInfo, this]);
        return childContainer;
    }

    /**
     * Resolve dependencies for the given function
     * @method resolveDependencies
     * @param {Function} fn
     * @return {Array<any>}
     */
    public resolveDependencies(fn: Function, targetKey?: string): any[] {
        //debug("%s: Resolve dependencies for: %j", this.id, fn.name);
        var info = this._getOrCreateConstructionSet(fn, targetKey),
            keys = info.keys || [],
            args = new Array(keys.length);
        var i = 0, ii = 0;

        try {
            for (i = 0, ii = keys.length; i < ii; ++i) {
                args[i] = this.get(keys[i]);
            }
        } catch (e) {
            var message = "Error"
            if (i < ii) {
                message += ` The argument at index ${i} (key:${keys[i]}) could not be satisfied.`;
            }

            throw createError("DependencyError", message, e);
        }

        return args
    }

    /**
    * Invokes a function, recursively resolving its dependencies.
    *
    * @method invoke
    * @param {Function} fn The function to invoke with the auto-resolved dependencies.
    * @param {any[]} [deps] Additional function dependencies to use during invocation.
    * @return {Object} Returns the instance resulting from calling the function.
    */
    public invoke(fn: Function, deps?: any[], targetKey?: string): any {
        var info = this._getOrCreateConstructionSet(fn, targetKey)

        try {
            var keys, args;
            if (info.dependencyResolver) {
                args = info.dependencyResolver.resolveDependencies(fn);
            } else {
                args = this.resolveDependencies(fn, targetKey)
            }

            if (deps !== undefined && Array.isArray(deps)) {
                args = args.concat(deps);
            }

            return (<any>info.activator).invoke(fn, args, targetKey, keys);

        } catch (e) {

            var activatingText = info.activator instanceof ClassActivator ? 'instantiating' : 'invoking';
            var message = `Error ${activatingText} ${(<any>fn).name}.`
            message += ' Check the inner error for details.'

            throw createError("DIInvokeError", message, e);

        }
    }

    public registerInstance(key: any, instance: any) {
        return this.registerHandler(key, _ => instance);
    }

    public registerTransient(key: any, fn: Function, targetKey?: string) {
        return this.registerHandler(key, x => x.invoke(fn, void 0, targetKey))
    }

    public registerSingleton(key: any, fn: Function, targetKey?: string) {
        var singleton: any;
        return this.registerHandler(key, x => singleton || (singleton = x.invoke(fn, void 0, targetKey)))
    }

    public registerFactory(key: any, fn: Function, targetKey?: string) {
        factory()(fn)
        return this.registerTransient(key, fn, targetKey);
    }

    public registerHandler(key: any, handler: IHandlerFunc) {
        this._getOrCreateEntry(key).push(handler)
        return this;
    }

    protected _getOrCreateEntry(key: string): IHandlerFunc[] {

        if (key === null || key === undefined) {
            throw new DIError('key cannot be null or undefined.  (Are you trying to inject something that doesn\'t exist with DI?)');
        }

        var entry = this.entries.get(key);

        if (entry === undefined) {
            entry = [];
            this.entries.set(key, entry);
        }

        return entry;

    }

    protected _getOrCreateConstructionSet(fn: Function, targetKey?: string): ConstructionInfo {
        var info = this.constructionInfo.get(fn)

        if (info === undefined) {
            info = this._createConstructionSet(fn, targetKey)
            this.constructionInfo.set(fn, info);
        }
        return info;
    }

    private _createConstructionSet(fn: Function, targetKey?: string): ConstructionInfo {
        let info: ConstructionInfo = {
            activator: Reflect.getOwnMetadata(MetaKeys.instanceActivator, fn, targetKey!) || ClassActivator.instance,
            dependencyResolver: Reflect.getOwnMetadata(MetaKeys.dependencyResolver, fn, targetKey!) || this
        };

        if ((<any>fn).inject !== undefined) {
            if (typeof (<any>fn).inject === 'function') {
                info.keys = (<any>fn).inject();
            } else {
                info.keys = (<any>fn).inject;
            }

            return info
        }
        info.keys = Reflect.getOwnMetadata(MetaKeys.paramTypes, fn, targetKey!)
            || getFunctionParameters(fn, true) || emptyParameters

        return info;
    }


}


var _global: Container | undefined;

export function makeGlobal(container: Container) {
    _global = container;
}

export function global() {
    if (!_global)
        _global = new Container();
    return _global;
}