"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
/**
 *
 *
 * @export
 * @class EventEmitterError
 * @extends {Error}
 */
class EventEmitterError extends Error {
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
    constructor(message, method, klass, ctx) {
        super(message);
        this.message = message;
        this.method = method;
        this.klass = klass;
        this.ctx = ctx;
    }
    /**
     *
     *
     * @returns
     *
     * @memberOf EventEmitterError
     */
    toString() {
        let prefix = "EventEmitterError";
        if (this.method && this.method != "") {
            prefix = `EventEmitter#${this.method}`;
        }
        return `${prefix}: ${this.message}`;
    }
}
exports.EventEmitterError = EventEmitterError;
function removeFromListener(listeners, fn, ctx) {
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
function isEventEmitter(a) {
    return a && (a instanceof EventEmitter || (utils_1.isFunction(a.on) && utils_1.isFunction(a.once) && utils_1.isFunction(a.off) && utils_1.isFunction(a.trigger)));
}
exports.isEventEmitter = isEventEmitter;
class EventEmitter {
    static throwError(error) {
        throw error;
    }
    get listeners() {
        return this._listeners;
    }
    on(event, fn, ctx, once = false) {
        let events = (this._listeners || (this._listeners = new Map())).get(event) || [];
        events.push({
            name: event,
            once: once,
            handler: fn,
            ctx: ctx || this
        });
        if (!this._listeners.has(event))
            this._listeners.set(event, events);
        return this;
    }
    once(event, fn, ctx) {
        return this.on(event, fn, ctx, true);
    }
    off(eventName, fn, ctx) {
        this._listeners = this._listeners || new Map();
        if (eventName == null && ctx == null) {
            this._listeners = new Map();
        }
        else if (this._listeners.has(eventName)) {
            let events = this._listeners.get(eventName);
            if (fn == null && ctx == null) {
                this._listeners.set(eventName, []);
            }
            else {
                removeFromListener(events, fn, ctx);
            }
        }
        else {
            for (let en of this._listeners.values()) {
                removeFromListener(en, fn, ctx);
            }
        }
        return this;
    }
    trigger(eventName, ...args) {
        this._listeners = this._listeners || new Map();
        let events = (this._listeners.get(eventName) || []).concat(this._listeners.get("*") || []);
        let event, a, index;
        let calls = [];
        let alls = [];
        for (let i = 0, ii = events.length; i < ii; i++) {
            event = events[i];
            a = args;
            if (events[i].name === '*') {
                alls.push(events[i]);
            }
            else {
                calls.push(events[i]);
            }
            if (events[i].once === true) {
                index = this._listeners.get(events[i].name).indexOf(events[i]);
                this._listeners.get(events[i].name).splice(index, 1);
            }
        }
        if (alls.length) {
            let a = [eventName].concat(args);
            this._executeListener(alls, a);
        }
        if (calls.length)
            this._executeListener(calls, args);
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
    _executeListener(func, args) {
        EventEmitter.executeListenerFunction(func, args);
    }
}
EventEmitter.throwOnError = false;
EventEmitter.executeListenerFunction = function (func, args) {
    utils_1.callFunc(func, args);
};
exports.EventEmitter = EventEmitter;
