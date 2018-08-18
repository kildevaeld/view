
export interface Destroyable {
    destroy(): this;
}

export interface Constructor<T> {
    new(...args: any[]): T;
    //prototype: T;
}

export interface InheritableConstructor<T> {
    new(...args: any[]): T;
    prototype: T;
    inherit<P extends AnyMap,
        S extends AnyMap>(protoProps: P, staticProps?: S): Constructor<T & P> & ConstructorWithSuper<P, T>;
}

export interface ConstructorWithSuper<T, S> {
    new(...args: any[]): T;
    __super__: S
}

export type AnyMap<T = any> = { [key: string]: T };

export type Condition<T = any> = boolean | ((args?: T) => boolean | Subscribable<boolean> | PromiseLike<boolean>);

export type Callback = (...args: any[]) => void;


export interface Call {
    ctx?: any
    handler: Callback;
    condition?: (args: any[]) => boolean;
}


export interface Subscription {
    unsubscribe(): void;
}

export interface Subscribable<T> {
    subscribe(next: (value: T | null) => any, error?: (err: Error) => any, completed?: () => any): Subscription;
}