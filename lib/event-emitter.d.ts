import { IEventEmitter, EventHandler, Event } from './types';
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
