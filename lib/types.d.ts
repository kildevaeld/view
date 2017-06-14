export interface EventHandler {
    (...args: any[]): void;
}
export interface IEventEmitter {
    trigger(...args: any[]): any;
    on(event: string, handler: EventHandler, ctx?: any): any;
}
export interface IView extends IEventEmitter {
    render(): this;
    el?: Element;
    destroy(): void;
}
export declare type Constructor<T> = new (...args: any[]) => T;
