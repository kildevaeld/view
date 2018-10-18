import { Constructor } from './types';
import { isFunction } from './utils';

/**
 * Used  everywhere as a factory for constructing  instances
 *
 * @export
 * @interface IInvoker
 */
export interface IInvoker {
    get<T>(key: Constructor<T>): T
}

const hasReflect = typeof Reflect !== 'undefined' && isFunction(Reflect.construct);

const defaultInvoker = {
    get<T>(V: Constructor<T>): T {
        if (hasReflect)
            return Reflect.construct(V, []);
        return new V();
    }
};

export var Invoker = defaultInvoker;

/**
 * Set current  invoker.
 * If `i` is undefined, the defaultInvoker will be used
 *
 * @export
 * @param {IInvoker} [i]
 */
export function setInvoker(i?: IInvoker) {
    if (!i) i = defaultInvoker;
    Invoker = i;
}


const emptyParameters = Object.freeze([]);

/**
 * Auto inject dependencies.
 */
export function autoinject(target: any) {
    target.inject = Reflect.getOwnMetadata('design:paramtypes', target) || emptyParameters;
}

/**
 * Auto inject dependencies.
 */
export function inject(deps: any[]) {
    return function (target: any) {
        target.inject = deps
    }
}