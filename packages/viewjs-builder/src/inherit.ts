import { AnyMap, Constructor } from '@viewjs/types';
import { isObject, has } from '@viewjs/utils';
import { InheritableConstructor, ConstructorWithSuper } from './types';


export function inherit<
    T,
    P extends AnyMap,
    S extends AnyMap
    >(parent: Constructor<T>, protoProps: P, staticProps?: S): InheritableConstructor<T & P> & ConstructorWithSuper<P, T> & S {

    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `protoProps` definition), or defaulted
    // by us to simply call the parent constructor.
    if (protoProps && has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function (this: {}) { return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    Object.assign(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function and add the prototype properties.
    child.prototype = create(parent.prototype, protoProps);
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed
    // later.
    (child as any).__super__ = parent.prototype;
    (child as any).inherit = function (props: any, statics: any) {
        return inherit(this, props, statics);
    };

    (child as any).create = function (...args: any[]) {
        return Reflect.construct(this, args);
    }

    return child as any;
};


const nativeCreate = Object.create;
function Ctor() { };

function baseCreate(prototype: any) {
    if (!isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new (Ctor as any);
    Ctor.prototype = null;
    return result;
};


function create(prototype: any, props: any) {
    var result = baseCreate(prototype);
    if (props) Object.assign(result, props);
    return result;
}