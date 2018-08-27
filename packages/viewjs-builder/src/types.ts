import { AnyMap } from '@viewjs/types';

export interface InheritableConstructor<T> {
    new(...args: any[]): T;
    prototype: T;
    inherit<P extends AnyMap,
        S extends AnyMap>(protoProps: P, staticProps?: S): InheritableConstructor<T & P> & ConstructorWithSuper<P, T>;
    create(...args: any[]): T
}

export interface ConstructorWithSuper<T, S> {
    new(...args: any[]): T;
    __super__: S
}