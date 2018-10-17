import { inherit } from './inherit';
import { Base, AnyMap, Constructor } from '@viewjs/utils';
import { InheritableConstructor, ConstructorWithSuper } from './types';

declare module '@viewjs/utils' {
    class Base {
        static inherit<
            T,
            Proto extends AnyMap,
            P extends AnyMap,
            S extends AnyMap
            >(this: Constructor<T>, protoProps: P, staticProps?: S): InheritableConstructor<T & P> & ConstructorWithSuper<P, T> & S;
    }
}

Base.inherit = function <
    T,
    P extends AnyMap,
    S extends AnyMap
    >(this: Constructor<T>, protoProps: P, staticProps?: S): InheritableConstructor<T & P> & ConstructorWithSuper<P, T> & S {
    return inherit(this, protoProps, staticProps);
}