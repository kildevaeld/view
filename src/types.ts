
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
    get<T>(key: any): T
}

export var Invoker = {
    get<T extends IView = IView>(V: Constructor<T>): T {
        return Reflect.construct(V, []);
    }
}

export function setInvoker(i: IInvoker) {
    Invoker = i;
}


