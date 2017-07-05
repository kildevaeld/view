import { extend, triggerMethodOn, uniqueId, indexOf, result, matches } from './utils';
import { AbstractView } from './abstract-view'
//import * as Debug from 'debug';

const debug = (..._: any[]) => { }  //Debug("views");

export type EventsMap = { [key: string]: Function | string }
export type StringMap = { [key: string]: string }
export type UIMap = { [key: string]: HTMLElement };

const kUIRegExp = /@(?:ui\.)?([a-zA-Z_\-\$#]+)/i,
    unbubblebles = 'focus blur change'.split(' ');

export interface DelegateEvent extends Event {
    delegateTarget?: Element;
}

export function normalizeUIKeys(obj: any, uimap: StringMap): StringMap {
    let o: { [key: string]: any } = {}, k, v;
    for (k in obj) {
        v = obj[k];
        k = normalizeUIString(k, uimap);
        o[k] = v;
    }
    return o;
}

export function normalizeUIString(str: string, uimap: StringMap): string {
    let ms, ui, sel;
    if ((ms = kUIRegExp.exec(str)) != null) {
        ui = ms[1], sel = uimap[ui];
        if (sel != null) str = str.replace(ms[0], sel);
    }
    return str
}

export interface BaseViewConstructor<T extends BaseView<U>, U extends Element> {
    new (...args: any[]): T;
    readonly prototype: T;
}


export interface BaseViewOptions<T extends Element> {
    el?: T;
    attachId?: boolean;
}


export class BaseView<T extends Element> extends AbstractView<T> {

    static find(selector: string, context: HTMLElement): NodeList {
        return context.querySelectorAll(selector);
    }

    public events: EventsMap;
    public ui: UIMap;
    public triggers: StringMap;

    private _ui: { [key: string]: string };
    private _domEvents: any[];
    private _vid: string;


    get vid() {
        return this._vid;
    }

    get options() {
        return this._options;
    }

    constructor(private _options: BaseViewOptions<T> = {}) {

        super();

        this.setElement(_options.el, false);
        this._domEvents = []
        this._vid = uniqueId('vid');

    }


    delegateEvents(events?: EventsMap): any {

        if (!this.el) return;


        this._bindUIElements();

        events = events || result(this, 'events') || {};
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
                this.el.removeEventListener(item.eventName, item.handler);
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
                /*if (node && (node as Element).matches(selector as string)) {

                    e.delegateTarget = node as Element;
                    listener!(e);
                }*/
                if (node && matches((node as Element), selector as string)) {
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
        this.el!.addEventListener(eventName, handler, useCap);
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

                this.el!.removeEventListener(item.eventName, item.handler);
                this._domEvents.splice(indexOf(handlers, item), 1);
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

        if (trigger)
            this.undelegateEvents();

        if (this.el && this.options.attachId) {
            this.el!.removeAttribute('data-vid');
        }

        this._el = el;
        if (trigger)
            this.delegateEvents();


        if (this.el && this.options.attachId) {
            this.el!.setAttribute('data-vid', this.vid);
        }

        return this;
    }

    destroy(): any {
        this.undelegateEvents()
        if (this.el && this.options.attachId) {
            this.el!.removeAttribute('data-vid');
        }
        super.destroy();
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

            triggerMethodOn(this, options.event, {
                view: this,
            }, e);
        };
    }
}
