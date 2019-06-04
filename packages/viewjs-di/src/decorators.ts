import { MetaKeys, IActivator, emptyParameters, IDependencyResolver } from './common';
import { TransientRegistration, SingletonRegistration } from './registers';
import { FactoryActivator } from './activators';
import { global } from './container';


/**
 * Auto inject dependencies.
 */
export function autoinject(target: any) {
    target.inject = Reflect.getOwnMetadata(MetaKeys.paramTypes, target) || emptyParameters;
}

export function inject(...rest: any[]) {
    return function (target: any) {
        if (rest.length === 1 && typeof rest[0] === 'string')
            target.inject = rest[0];
        else
            target.inject = rest;
    }
}


/**
 * Mark a property to lazy injected by the global di-container,
 * @param target 
 * @param key 
 * @param descriptor 
 * @example
 *  class SomeComponent extends Component {
 *      @inject
 *      service: Service
 * 
 *      render() {
 *          return <div>{this.service.getAll()}</div>
 *      }
 *  }
 */
export function property(target: any, key: string, descriptor?: PropertyDescriptor): any {
    let Dependency = Reflect.getOwnMetadata("design:type", target, key);
    if (!Dependency) throw new Error('design:type metadata does not exists on property. consider compiling typescript with "emitDecoratorMetadata" enabled or add design:type metadata manually');

    // In IE11 calling Object.defineProperty has a side-effect of evaluating the
    // getter for the property which is being replaced. This causes infinite
    // recursion and an "Out of stack space" error.
    let definingProperty = false;

    return {
        configurable: true,
        get: function () {
            if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
                return descriptor;
            }
            // Cache the dependency resolution as we don't want transient values
            // to keep being instantiated on property access.
            const instance = global().get(Dependency);
            definingProperty = true;
            Object.defineProperty(this, key, {
                get() {
                    return instance;
                }
            });
            definingProperty = false;
            return instance;
        },
    }

}



export function registration(value: any, targetKey?: string) {
    return function (target: any) {
        Reflect.defineMetadata(MetaKeys.registration, value, target, targetKey!)
    }
}

export function transient(key?: any, targetKey?: string) {
    return registration(new TransientRegistration(key), targetKey);
}

export function singleton(keyOrRegisterInChild?: any, registerInChild: boolean = false, targetKey?: string) {
    return registration(new SingletonRegistration(keyOrRegisterInChild, registerInChild), targetKey);
}

export function instanceActivator(value: IActivator, targetKey?: string): ClassDecorator {
    return function (target) {
        Reflect.defineMetadata(MetaKeys.instanceActivator, value, target, targetKey!)
    }
}

export function factory() {
    return instanceActivator(FactoryActivator.instance);
}

export function dependencyResolve(value: IDependencyResolver, targetKey?: string): ClassDecorator {
    return function (target: Function) {
        Reflect.defineMetadata(MetaKeys.dependencyResolver, value, target, targetKey!);
    }
}
