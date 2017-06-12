import { EventEmitter } from './event-emitter';
import { extend, camelcase, callFunc } from './utils';
//import * as Debug from 'debug';
import * as dom from './dom';

const debug = (...args: any[]) => { }  //Debug("views");

export type EventsMap = { [key: string]: Function | string }
export type StringMap = { [key: string]: string }
export type UIMap = { [key: string]: HTMLElement };

const kUIRegExp = /@ui.([a-zA-Z_\-\$#]+)/i;
const unbubblebles = 'focus blur change'.split(' ');

export interface DelegateEvent extends Event {
    delegateTarget?: Element;
}

export function normalizeUIKeys(obj: any, uimap: StringMap): StringMap {
    let o: { [key: string]: any } = {}, k, v, ms, sel, ui;
    for (k in obj) {
        v = obj[k];
        if ((ms = kUIRegExp.exec(k)) !== null) {
            ui = ms[1], sel = uimap[ui];
            if (sel != null) {
                k = k.replace(ms[0], sel);
            }
        }
        o[k] = v;
    }
    return o;
}

export interface BaseViewConstructor<T extends BaseView<U>, U extends Element> {
    new (...args: any[]): BaseView<U>;
}


export interface BaseViewOptions<T extends Element> {
    el?: T;
}

export abstract class BaseView<T extends Element> extends EventEmitter {

    static find(selector: string, context: HTMLElement): NodeList {
        return context.querySelectorAll(selector);
    }

    public get el(): T | undefined {
        return this._el;
    }

    public set el(el: T | undefined) {
        this.setElement(el, false);
    }

    public events: EventsMap;
    public ui: UIMap;
    public triggers: StringMap;

    private _el?: T;
    private _ui: { [key: string]: string };
    private _domEvents: any[];


    constructor(options: BaseViewOptions<T> = {}) {

        super();

        this._el = options.el;
        this._domEvents = []

    }


    delegateEvents(events?: EventsMap): any {
        if (!this.el) return;

        this._bindUIElements();

        events = events || this.events || {}; //result(this, 'events');
        events = normalizeUIKeys(events, this._ui);

        let triggers = this._configureTriggers();

        events = extend({}, events!, triggers);
        debug('%s delegate events %j', this, events);

        if (!events) return this;
        //if (!(events || (events = result(this, 'events')))) return this;
        this.undelegateEvents();

        let dels = []
        for (let key in events) {
            let method = events[key];
            if (typeof method !== 'function') method = (<any>this)[<string>method];

            let match = key.match(/^(\S+)\s*(.*)$/)!;

            // Set delegates immediately and defer event on this.el
            let boundFn = (<any>method).bind(this); // bind(<Function>method, this);
            if (match[2]) {
                this.delegate(match[1], match[2], boundFn);
            } else {
                dels.push([match[1], boundFn]);
            }
        }

        dels.forEach(d => { this.delegate(d[0], d[1]) });

        return this;
    }


    undelegateEvents() {
        if (!this.el) return this;
        this._unbindUIElements();
        debug('%s undelegate events', this);

        if (this.el) {
            for (var i = 0, len = this._domEvents.length; i < len; i++) {
                var item = this._domEvents[i];
                dom.removeEventListener(this.el, item.eventName, item.handler);
            }
            this._domEvents.length = 0;
        }
        return this;
    }

    delegate(eventName: string, selector?: string | Function, listener?: Function) {
        if (!this.el) return this;

        if (typeof selector === 'function') {
            listener = <Function>selector;
            selector = undefined;
        }

        let root = this.el;
        let handler = selector ? function (e: DelegateEvent) {
            let node = (e.target || e.srcElement) as Node | null;
            // Already handled
            if (e.delegateTarget) return;

            for (; node && node != root; node = node!.parentNode) {
                if (node && dom.matches(node as Element, selector as string)) {

                    e.delegateTarget = node as Element;
                    listener!(e);
                }
            }
        } : function (e: any) {
            if (e.delegateTarget) return;
            listener!(e);
        };

        let useCap = !!~unbubblebles.indexOf(eventName) && selector != null;
        debug('%s delegate event %s ', this, eventName);
        dom.addEventListener(this.el!, eventName, handler, useCap);
        this._domEvents.push({ eventName: eventName, handler: handler, listener: listener, selector: selector });
        return handler;
    }

    undelegate(eventName: string, selector?: string | Function, listener?: Function) {
        if (!this.el) return this;

        if (typeof selector === 'function') {
            listener = <Function>selector;
            selector = undefined;
        }

        if (this.el) {
            var handlers = this._domEvents.slice();
            for (var i = 0, len = handlers.length; i < len; i++) {
                var item = handlers[i];

                var match = item.eventName === eventName &&
                    (listener ? item.listener === listener : true) &&
                    (selector ? item.selector === selector : true);

                if (!match) continue;

                dom.removeEventListener(this.el!, item.eventName, item.handler);
                this._domEvents.splice(dom.indexOf(handlers, item), 1);
            }
        }
        return this;
    }

    render() {
        this.undelegateEvents();
        this.delegateEvents();
        return this;
    }

    setElement(el?: T, trigger: boolean = true) {
        this.triggerMethod('before:set:element');
        if (trigger)
            this.undelegateEvents();

        this._el = el;
        if (trigger)
            this.delegateEvents();
        this.triggerMethod('set:element')

        return this;
    }

    destroy(): any {
        this.undelegateEvents()
        this.off();
        return this;
    }

    private _bindUIElements() {
        let ui = <any>this.ui;
        if (!ui) return;

        if (!this._ui) {
            this._ui = ui;
        }

        ui = this._ui;

        this.ui = {};

        Object.keys(ui).forEach((k) => {
            let elm: any = this.el!.querySelectorAll(ui[k]);
            if (elm && elm.length) {
                // unwrap if it's a nodelist.
                if (elm instanceof NodeList) {
                    elm = elm[0];
                }
                debug('%s added ui element %s %s', this, k, ui[k]);
                this.ui[k] = elm;
            } else {
                debug('%s ui element not found ', this, k, ui[k]);
            }
        });

    }


    private _unbindUIElements() {

    }


    private _configureTriggers() {

        let triggers = this.triggers || {};
        triggers = normalizeUIKeys(triggers, this._ui);

        // Configure the triggers, prevent default
        // action and stop propagation of DOM events
        let events: { [key: string]: Function } = {}, val, key;
        for (key in triggers) {
            val = triggers[key];
            debug('%s added trigger %s %s', this, key, val)
            events[key] = this._buildViewTrigger(val);
        }

        return events;

    }

    private _buildViewTrigger(triggerDef: any) {

        if (typeof triggerDef === 'string')
            triggerDef = { event: triggerDef }

        let options = extend({
            preventDefault: true,
            stopPropagation: true
        }, triggerDef);

        return (e: Event) => {

            if (e) {
                if (e.preventDefault && options.preventDefault) {
                    e.preventDefault();
                }
                if (e.stopPropagation && options.stopPropagation) {
                    e.stopPropagation();
                }
            }

            this.triggerMethod(options.event, {
                view: this,
            });

        };
    }

    protected triggerMethod(eventName: string, ...args: any[]) {
        var self: any = this;
        let ev = camelcase("on-" + eventName.replace(':', '-'))


        if (self[ev] && typeof self[ev] === 'function') {
            callFunc([{
                handler: self[ev],
                ctx: this
            } as any], args);
        }

        args = [eventName].concat(args)
        callFunc([{
            handler: this.trigger,
            ctx: this
        } as any], args);
    }

}


export interface TriggerOptions {
    event: string;
    preventDefault?: boolean;
    stopPropagation?: boolean;
}

export type TriggerMap = {[key:string]: string | TriggerOptions };

export interface AttributesOptions {
    events?: EventsMap;
    ui?: StringMap;
    triggers?: TriggerMap;
}



export function attributes(attrs: AttributesOptions): ClassDecorator {
    return function <T extends Function>(target: T) {
        extend(target.prototype, attrs);
    }
}

export function events(events: { [key: string]: string | Function }): ClassDecorator {
    return function <T extends Function>(target: T) {
        target.prototype.events = events;
    }
}

export function triggers(triggers: { [key: string]: string }): ClassDecorator {
    return function <T extends Function>(target: T) {
        target.prototype.triggers = triggers;
    }
}

export function ui(ui: { [key: string]: string }): ClassDecorator {
    return function <T extends Function>(target: T) {
        target.prototype.ui = ui;
    }
}