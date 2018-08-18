import { isObjectLike, isFunction, isPlainObject } from "@viewjs/utils";

export interface IView {
    render(): this;
    el?: Element;
    destroy(): this;
}


export interface EventsMap { [key: string]: (Function | string)[] | Function | string }
export interface StringMap { [key: string]: string }
export interface UIMap { [key: string]: HTMLElement };

export interface TriggerOptions {
    event: string;
    preventDefault?: boolean;
    stopPropagation?: boolean;
}


/**
 * A key-value maps
 * @example
 *  "<dom-event> <selector>": "<event>" | TriggerOptions
 *  "<dom-event> <ui>": ...
 * 
 * @export
 * @interface TriggerMap
 */
export interface TriggerMap { [key: string]: string | TriggerOptions };

export type AnyMap<T = any> = { [key: string]: T };

export interface IRenderer {
    mount(attributes: AnyMap<any>, container: Element, prev: Element | undefined): Element;
    unmount(el: Element): boolean;
}

export type Resolvable<R, A = any> = R | PromiseLike<R> | ((args?: A) => R | PromiseLike<R>);

export function isRenderer(a: any): a is IRenderer {
    return a &&
        isObjectLike(a) &&
        isFunction((a as any).mount) &&
        isFunction((a as any).unmount)
}

export function isPromise<T>(a: any): a is PromiseLike<T> {
    return a &&
        isObjectLike(a) &&
        isFunction((a as any).then) &&
        isFunction((a as any).catch)
}

export function resolve<T>(r: Resolvable<T>, args?: any): PromiseLike<T> {
    const resolved = isFunction(r) ? r(args) : r;
    if (isPromise<T>(resolved)) {
        return resolved;
    }
    return Promise.resolve(resolved);
}