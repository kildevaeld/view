import { uniqueId, result, debug as Debug, isString, isFunction, isCall, callFuncCond } from '@viewjs/utils';
import { AbstractView } from './abstract-view'
import { EventsMap, EventHandler, EventCall } from './types';
import { Call } from '@viewjs/types';

const debug = Debug("View");

const unbubblebles = 'focus blur change'.split(' ');

export interface DelegateEvent<E extends Element = HTMLElement> extends Event {
    delegateTarget?: E;
}

export interface BaseViewConstructor<T extends View<U>, U extends Element> {
    new(...args: any[]): T;
    readonly prototype: T;
}

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
    listeners: Call[];
}

export class View<T extends Element = HTMLElement, OptionsType extends BaseViewOptions<T> = BaseViewOptions<T>> extends AbstractView<T> {

    events: EventsMap | undefined;
    private _el: T | undefined;

    private _domEvents: DomEvent[];
    private _vid: string;
    private _options: OptionsType | undefined;

    // Unique view id
    get vid() {
        return this._vid;
    }

    get options() {
        return this._options!;
    }

    constructor(options?: OptionsType) {

        super();
        (this as any)._options = Object.assign({}, options || {});

        this._domEvents = []
        this._vid = uniqueId('vid');
        if (this._options!.el)
            this.setElement(this._options!.el);
        if (this._options!.events)
            this.events = Object.assign(this.events || {}, this.options.events);

    }

    delegateEvents(events?: EventsMap): any {

        if (!this.el) return;

        events = events || result(this, 'events') || {};
        debug('%s delegate events %o', this, events);

        if (!events) return this;


        let dels: [string, Call][] = []
        for (let key in events) {
            let methods = events[key];
            const match = key.match(/^(\S+)\s*(.*)$/)!;

            if (!Array.isArray(methods)) methods = [methods]

            for (let i = 0, ii = methods.length; i < ii; i++) {
                let method = methods[i]

                if (isString(method)) method = { handler: method }
                else if (isFunction(method)) method = {
                    ctx: this,
                    handler: method as EventHandler
                }

                if (isString((method as EventCall).handler))
                    (method as EventCall).handler = (this as any)[(method as EventCall).handler as string];

                // Set delegates immediately and defer event on this.el
                //const boundFn = method as EventHandler;
                if (match[2]) {
                    this.delegate(match[1], match[2], method as Call);
                } else {
                    dels.push([match[1], method as Call]);
                }

            }

        }

        dels.forEach(d => { this.delegate(d[0], d[1]) });

        return this;
    }

    undelegateEvents() {
        if (!this.el) return this;

        debug('%s undelegate events', this);

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

    protected delegate(eventName: string, selector?: string | Call, listener?: Call) {
        if (!this.el) return this;

        if (isCall(selector)) {
            listener = <Call>selector;
            selector = undefined;
        }

        let id: string = uniqueId();
        let domEvent = this._domEvents.find(m => m.eventName == eventName && m.selector == selector);

        if (domEvent) {
            id = domEvent.id;
            domEvent.listeners.push(Object.assign({}, listener)!);
            return this;
        } else {
            domEvent = { id: id, selector: selector, listeners: [Object.assign({ ctx: this }, listener)], eventName: eventName } as any;
        }

        let root = this.el;
        const self = this;
        domEvent!.handler = selector ? function (e: DelegateEvent) {
            let node = (e.target || e.srcElement) as Node | null;

            for (; node && node != root; node = node!.parentNode) {
                if (node && (node as Element).matches(selector as string)) {
                    if (e.delegateTarget && e.delegateTarget !== node) {
                        debug('WARN: %s delegateTarget already set and node is not same', self);
                        continue;
                    }
                    e.delegateTarget = node as HTMLElement;
                    debug("%s trigger %i listeners for '%s'-event on selector '%s'", self, domEvent!.listeners.length, domEvent!.eventName, domEvent!.selector)
                    callFuncCond(domEvent!.listeners, [e]);

                }
            }
        } : function (e: any) {
            if (e.delegateTarget) return;
            callFuncCond(domEvent!.listeners, [e]);
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

        const indexOfListener = (item: DomEvent, listener: EventListener) => {
            return item.listeners.findIndex(m => m.handler === listener);
        }

        var handlers = this._domEvents.slice();
        for (var i = 0, len = handlers.length; i < len; i++) {
            var item = handlers[i];

            var match = item.eventName === eventName &&
                (listener ? !!~indexOfListener(item, listener!) : true) &&
                (selector ? item.selector === selector : true);

            if (!match) continue;

            if ((listener && item.listeners.length == 1) || !listener) {
                debug("%s remove dom eventlistener for event '%s'", this, item.eventName);
                this.el!.removeEventListener(item.eventName, item.handler);
                this._domEvents.splice(this._domEvents.indexOf(item), 1);
            } else {
                debug("%s remove listener for event '%s'", this, item.eventName);
                item.listeners.splice(indexOfListener(item, listener), 1);
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

        if (this._el === el) return this;

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
        return super.destroy();
    }

    toString() {
        return `[${(this as any).name || this.constructor.name} ${this.vid}]`;
    }

}
