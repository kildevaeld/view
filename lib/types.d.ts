export interface IEventEmitter {
    trigger(...args: any[]): void;
}
export interface IView extends IEventEmitter {
    render(): this;
    el?: Element;
    destroy(): void;
}
export declare type Constructor<T> = new (...args: any[]) => T;
