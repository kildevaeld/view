
export interface IView /*extends IEventEmitter*/ {
    render(): this;
    el?: Element;
    destroy(): void;
}

export type Constructor<T> = new (...args: any[]) => T;

export interface EventsMap { [key: string]: Function | string }
export interface StringMap { [key: string]: string }
export interface UIMap { [key: string]: HTMLElement };