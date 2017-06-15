import { IEventEmitter, EventHandler, Event } from './types';
/**
 *
 *
 * @export
 * @class EventEmitterError
 * @extends {Error}
 */
export declare class EventEmitterError extends Error {
    message: string;
    method: string;
    klass: any;
    ctx: any;
    /**
     * Creates an instance of EventEmitterError.
     *
     * @param {string} [message]
     * @param {string} [method]
     * @param {*} [klass]
     * @param {*} [ctx]
     *
     * @memberOf EventEmitterError
     */
    constructor(message: string, method?: string, klass?: any, ctx?: any);
    /**
     *
     *
     * @returns
     *
     * @memberOf EventEmitterError
     */
    toString(): string;
}
export declare function isEventEmitter(a: any): a is IEventEmitter;
export declare class EventEmitter implements IEventEmitter {
    static throwOnError: boolean;
    static throwError(error: Error): void;
    static executeListenerFunction: (func: Event[], args?: any[]) => void;
    private _listeners;
    readonly listeners: Map<any, Event[]>;
    on(event: any, fn: EventHandler, ctx?: any, once?: boolean): any;
    once(event: any, fn: EventHandler, ctx?: any): any;
    off(eventName?: any, fn?: EventHandler, ctx?: any): any;
    trigger(eventName: any, ...args: any[]): any;
    private _executeListener(func, args?);
}
