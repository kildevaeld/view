import { inherit } from './inherit';
import { Base } from '@viewjs/utils';
import { AnyMap, Constructor } from '@viewjs/types';
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
    Proto extends AnyMap,
    P extends AnyMap,
    S extends AnyMap
    >(this: Constructor<T>, protoProps: P, staticProps?: S): InheritableConstructor<T & P> & ConstructorWithSuper<P, T> & S {
    return inherit(this, protoProps, staticProps);
}