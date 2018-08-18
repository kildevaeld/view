import { MetaKeys, IActivator, emptyParameters, IDependencyResolver } from './common';
import { TransientRegistration, SingletonRegistration } from './registers';
import { FactoryActivator } from './activators';



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
