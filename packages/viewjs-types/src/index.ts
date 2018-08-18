
export interface Destroyable {
    destroy(): this;
}

export interface Constructor<T> {
    new(...args: any[]): T;
    //prototype: T;
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