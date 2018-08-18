
export const MetaKeys = {
    registration: Symbol.for('di:registration'),
    instanceActivator: Symbol.for('di:instance-activator'),
    dependencyResolver: Symbol.for('di:dependency-resolver'),
    paramTypes: 'design:paramtypes', // This should match, what tsc is emitting
    properties: 'design:properties' // This should match, what tsc is emitting
}

export var emptyParameters = Object.freeze([]);

const paramRegEx = /function[^(]*\(([^)]*)\)/i;

export function getFunctionParameters(fn: Function, cache: boolean = true): string[] {
    let params = Reflect.getOwnMetadata(MetaKeys.paramTypes, fn);
    if (!params) {
        const match = fn.toString().match(paramRegEx)
        if (match) {
            params = match[1].replace(/\W+/, ' ').split(' ').map(x => x.replace(',', '').trim())
                .filter(m => m !== '')
            if (cache)
                Reflect.defineMetadata(MetaKeys.paramTypes, params, fn);
        }
    }

    return params || [];
}

export interface IHandlerFunc {
    (c: IActivator): any
}

/**
 * IActivator has the responsibility to instantiate a function
 * 
 * @export
 * @interface IActivator
 */
export interface IActivator {
    invoke(fn: Function, args?: any[], targetKey?: string): any
}


export interface IDependencyResolver {
    resolveDependencies(fn: Function, targetKey?: string): any[]
}

export interface IContainer {
    parent?: IContainer;
    root?: IContainer;
    get<T>(key: any): T;
    getAll<T>(key: any): T[];
    hasHandler(key: any, parent: boolean): boolean;
    registerTransient(key: any, fn: Function, targetKey?: string): this;
    registerSingleton(key: any, fn: Function, targetKey?: string): this;
    registerInstance(key: any, instance: any): this;
    registerFactory(key: any, fn: Function, targetKey?: string): this;
    registerHandler(key: any, handler: IHandlerFunc): this;
}