import { IEventEmitter, EventHandler, Event } from './types';
import { Constructor } from '@viewjs/types'
import { callFuncCond, Base } from '@viewjs/utils';

function removeFromListener(listeners: Event[], fn?: EventHandler, ctx?: any) {
    for (let i = 0; i < listeners.length; i++) {
        let e = listeners[i];
        if ((fn == null && ctx != null && e.ctx === ctx) ||
            (fn != null && ctx == null && e.handler === fn) ||
            (fn != null && ctx != null && e.handler === fn && e.ctx === ctx)) {
            listeners.splice(i, 1);
        }
    }
    return listeners;
}

/**
 * Makes target, Base, an EventEmitter
 * 
 * @export
 * @param {T} Base 
 * @template
 * @returns {(Constructor<IEventEmitter> & T)} 
 */
export function withEventEmitter<T extends Constructor<{}>>(Base: T): Constructor<IEventEmitter> & T {
    return class extends Base {
        private _listeners: Map<any, Event[]> | undefined = void 0;

        get listeners() {
            return this._listeners;
        }

        on(event: any, fn: EventHandler, ctx?: any, once: boolean = false): any {
            let events = (this._listeners || (this._listeners = new Map())).get(event) || [];

            events.push({
                name: event,
                once: once,
                handler: fn,
                ctx: ctx || this
            });

            if (!this._listeners.has(event)) this._listeners.set(event, events);

            return this
        }

        once(event: any, fn: EventHandler, ctx?: any): any {
            return this.on(event, fn, ctx, true);
        }

        off(eventName?: any, fn?: EventHandler, ctx?: any): any {
            this._listeners = this._listeners || new Map();
            if (eventName == null && ctx == null) {
                this._listeners = new Map();
            } else if (this._listeners.has(eventName!)) {
                let events = this._listeners.get(eventName!)!;
                if (fn == null && ctx == null) {
                    this._listeners.set(eventName!, []);
                } else {
                    removeFromListener(events, fn, ctx);
                }

            } else {

                this._listeners.forEach((value) => {
                    removeFromListener(value, fn, ctx)
                });
            }

            return this;
        }

        trigger(eventName: any, ...args: any[]): any {

            this._listeners = this._listeners || new Map();
            let events = (this._listeners.get(eventName) || []).concat(this._listeners.get("*") || []);

            let index;
            let calls: Event[] = [];
            let alls: Event[] = [];

            for (let i = 0, ii = events.length; i < ii; i++) {

                if (events[i].name === '*') {
                    alls.push(events[i]);
                } else {
                    calls.push(events[i]);
                }

                if (events[i].once === true) {
                    index = this._listeners.get(events[i].name)!.indexOf(events[i])
                    this._listeners.get(events[i].name)!.splice(index, 1)
                }
            }

            if (alls.length) {
                this._executeListener(alls, [eventName].concat(args));
            }

            if (calls.length) this._executeListener(calls, args);
            // Handle errors event
            else if (eventName === 'error' && EventEmitter.throwOnError) {
                if (args.length) {
                    let a = args[0];
                    if (!(a instanceof Error)) {
                        a = new Error(String(a));
                    }
                    EventEmitter.throwError(a);
                }
            }

            return this;

        }

        destroy() {
            if (typeof Base.prototype.destroy === 'function')
                Base.prototype.destroy.call(this);
            this.off();
            return this;
        }

        private _executeListener(func: Event[], args?: any[]) {
            EventEmitter.executeListenerFunction(func, args);
        }
    }
}



export class EventEmitter extends withEventEmitter(Base) { }


export namespace EventEmitter {
    /**
     * If true EventEmitter will call throwError, when when no listeners for the "error" event
     */
    export var throwOnError = false;

    export function throwError(error: Error) {
        throw error;
    }

    export function executeListenerFunction(func: Event[], args?: any[]) {
        callFuncCond(func, args);
    }
}