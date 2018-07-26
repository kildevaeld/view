import { normalizeUIKeys } from './utils';
import { extend, triggerMethodOn, uniqueId, indexOf, result, debug as Debug, matches } from '@viewjs/utils';
import { AbstractView } from './abstract-view'
import { StringMap, UIMap, EventsMap } from './types';
const debug = Debug("View");

const unbubblebles = 'focus blur change'.split(' ');

export interface DelegateEvent extends Event {
    delegateTarget?: Element;
}

export interface BaseViewConstructor<T extends View<U>, U extends Element> {
    new(...args: any[]): T;
    readonly prototype: T;
}

export type EventHandler<E extends Event = Event> = (event: E) => any;

export interface BaseViewOptions<T extends Element> {
    el?: T;
    attachId?: boolean;
    events?: EventsMap;
    [key: string]: any;
}

interface DomEvent {
    id: string;
    handler: EventHandler
    selector?: string;
    eventName: string;
    listeners: EventHandler[];
}

export class View<T extends Element = HTMLElement, OptionsType extends BaseViewOptions<T> = BaseViewOptions<T>> extends AbstractView<T> {

    private _events: EventsMap | undefined;
    private _el: T | undefined;

    public ui: UIMap;
    public triggers: StringMap;

    private _ui: { [key: string]: string };
    private _domEvents: DomEvent[];
    private _vid: string;
    private _options: OptionsType;

    set events(events: EventsMap) {
        if (this._events) {
            this.undelegateEvents();
        }
        this._events = extend({}, events);
    }

    get events() {
        return extend({}, this._events || {});
    }

    // Unique view id
    get vid() {
        return this._vid;
    }

    get options() {
        return this._options!;
    }

    constructor(options?: OptionsType) {

        super();
        (this as any)._options = extend({}, options || {});

        this._domEvents = []
        this._vid = uniqueId('vid');
        if (this._options.el)
            this.setElement(this._options!.el);

    }

    delegateEvents(events?: EventsMap): any {

        if (!this.el) return;

        events = events || result(this, 'events') || {};
        debug('%s delegate events %o', this, events);
        this._bindUIElements();


        events = normalizeUIKeys(events, this._ui);

        let triggers = this._configureTriggers();

        events = extend({}, events!, triggers);


        if (!events) return this;


        let dels: any[] = []
        for (let key in events) {
            let methods = events[key];
            const match = key.match(/^(\S+)\s*(.*)$/)!;

            if (!Array.isArray(methods)) methods = [methods]

            for (let i = 0, ii = methods.length; i < ii; i++) {
                let method = methods[i]

                if (typeof method !== 'function') method = (<any>this)[method];

                // Set delegates immediately and defer event on this.el
                const boundFn = method as EventHandler;
                if (match[2]) {
                    this.delegate(match[1], match[2], boundFn);
                } else {
                    dels.push([match[1], boundFn]);
                }

            }

        }

        dels.forEach(d => { this.delegate(d[0], d[1]) });

        return this;
    }


    undelegateEvents() {
        if (!this.el) return this;

        debug('%s undelegate events', this);

        this._unbindUIElements();

        if (this.el) {
            for (var i = 0, len = this._domEvents.length; i < len; i++) {
                var item = this._domEvents[i];
                debug("%s remove dom eventlistener for event '%s'", this, item.eventName);
                this.el.removeEventListener(item.eventName, item.handler);
            }
            this._domEvents.length = 0;
        }
        return this;
    }

    protected delegate(eventName: string, selector?: string | EventHandler, listener?: EventHandler) {
        if (!this.el) return this;

        if (typeof selector === 'function') {
            listener = <EventHandler>selector;
            selector = undefined;
        }

        let id: string = uniqueId();
        let domEvent = this._domEvents.find(m => m.eventName == eventName && m.selector == selector);

        if (domEvent) {
            id = domEvent.id;
            domEvent.listeners.push(listener!);
            return this;
        } else {
            domEvent = { id: id, selector: selector, listeners: [listener], eventName: eventName } as any;
        }

        let root = this.el;
        const self = this;
        domEvent!.handler = selector ? function (e: DelegateEvent) {
            let node = (e.target || e.srcElement) as Node | null;
            if (e.delegateTarget) return;

            for (; node && node != root; node = node!.parentNode) {
                if (node && matches((node as Element), selector as string)) {
                    e.delegateTarget = node as Element;
                    debug("%s trigger %i listeners for '%s'-event on selector '%s'", self, domEvent!.listeners.length, domEvent!.eventName, domEvent!.selector)
                    domEvent!.listeners.forEach(listener => listener.call(self, e));


                }
            }
        } : function (e: any) {
            if (e.delegateTarget) return;
            domEvent!.listeners.forEach(listener => listener.call(self, e));
        };

        let useCap = !!~unbubblebles.indexOf(eventName) && selector != null;
        debug("%s delegate event '%s'", this, eventName);
        this.el!.addEventListener(eventName, domEvent!.handler, useCap);
        this._domEvents.push(domEvent!);
        return this;
    }

    undelegate(eventName: string, selector?: string | EventHandler, listener?: EventHandler) {
        if (!this.el) return this;

        if (typeof selector === 'function') {
            listener = <EventHandler>selector;
            selector = undefined;
        }

        var handlers = this._domEvents.slice();
        for (var i = 0, len = handlers.length; i < len; i++) {
            var item = handlers[i];

            var match = item.eventName === eventName &&
                (listener ? !!~item.listeners.indexOf(listener!) : true) &&
                (selector ? item.selector === selector : true);

            if (!match) continue;

            if ((listener && item.listeners.length == 1) || !listener) {
                debug("%s remove dom eventlistener for event '%s'", this, item.eventName);
                this.el!.removeEventListener(item.eventName, item.handler);
                this._domEvents.splice(indexOf(handlers, item), 1);
            } else {
                debug("%s remove listener for event '%s'", this, item.eventName);
                item.listeners.splice(indexOf(item.listeners, listener), 1);
            }
        }

        return this;
    }

    render() {
        debug("%s render", this);
        this.undelegateEvents();
        this.delegateEvents();

        return this;
    }

    setElement(el?: T) {

        this.undelegateEvents();

        if (this.el && this.options.attachId) {
            debug("%s remove view id attribute", this);
            this.el!.removeAttribute('data-vid');
        }
        debug("%s set element", this, el);
        this._el = el;

        if (this.el && this.options.attachId) {
            debug("%s set view id attribute", this);
            this.el!.setAttribute('data-vid', this.vid);
        }

        return this;
    }

    getElement() {
        return this._el;
    }

    destroy(): any {
        debug("%s destroy", this);
        if (this.el && this.options.attachId) {
            this.el!.removeAttribute('data-vid');
        };
        this.setElement(void 0);
        super.destroy();
        return this;
    }

    private _bindUIElements() {

        if (!this._ui) {
            return;
        }

        const ui = this._ui;

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
        debug("%s unbind ui elements", this);
        this.ui = {};
    }


    private _configureTriggers() {

        let triggers = this.triggers || {};
        triggers = normalizeUIKeys(triggers, this._ui);

        // Configure the triggers, prevent default
        // action and stop propagation of DOM events
        let events: EventsMap = {}, val, key;
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

    toString() {
        return `[${(this as any).name || this.constructor.name} ${this.vid}]`;
    }

}
