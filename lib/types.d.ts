export interface IView {
    render(): this;
    el?: Element;
    destroy(): void;
}
export declare type Constructor<T> = new (...args: any[]) => T;
