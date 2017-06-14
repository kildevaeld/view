import { Call } from './utils';
import { IEventEmitter, EventHandler } from './types';
export declare function isEventEmitter(a: any): a is EventEmitter;
export declare class EventEmitter implements IEventEmitter {
    static executeListenerFunction: (func: Call[], args?: any[]) => void;
    private _listeners;
    on(event: any, fn: EventHandler, ctx?: any, once?: boolean): any;
    once(event: any, fn: EventHandler, ctx?: any): any;
    off(eventName?: any, fn?: EventHandler, ctx?: any): any;
    trigger(eventName: any, ...args: any[]): any;
    private _executeListener(func, args?);
}
