import { isFunction, isString, isObject } from '@viewjs/utils'

export class Base { }
export interface IView {
    render(): this;
    el?: Element;
    destroy(): this;
}

export type Constructor<T> = new (...args: any[]) => T;

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


export interface IInvoker {
    get<T>(key: Constructor<T>): T
}

const defaultInvoker = {
    get<T>(V: Constructor<T>): T {
        if (typeof Reflect !== 'undefined' && typeof Reflect.construct === 'function')
            return Reflect.construct(V, []);
        return new V();
    }
};

export var Invoker = defaultInvoker;

export function setInvoker(i?: IInvoker) {
    if (!i) i = defaultInvoker;
    Invoker = i;
}

export const debug = localStorage && localStorage.getItem("viewjs.debug") != null
    ? (namespace: string) => (...args: any[]) => {
        const l = args.length;
        if (l && isString(args[0])) {
            args[0] = namespace + ' ' + args[0];
        } else if (l) {
            args.unshift(namespace);
        } else return;

        console.log(...args.map(m => (isObject(m) && m instanceof Base) ? String(m) : m))
    }
    : (_: string) => () => { }
