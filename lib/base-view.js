"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const utils_2 = require("@viewjs/utils");
const abstract_view_1 = require("./abstract-view");
const debug = utils_2.debug("BaseView");
const unbubblebles = 'focus blur change'.split(' ');
class BaseView extends abstract_view_1.AbstractView {
    constructor(options) {
        super();
        this._options = utils_2.extend({}, options || {});
        this._domEvents = [];
        this._vid = utils_2.uniqueId('vid');
        if (this._options.el)
            this.setElement(this._options.el);
    }
    static find(selector, context) {
        return context.querySelectorAll(selector);
    }
    set events(events) {
        if (this._events) {
            this.undelegateEvents();
        }
        this._events = utils_2.extend({}, events);
    }
    get events() {
        return utils_2.extend({}, this._events || {});
    }
    // Unique view id
    get vid() {
        return this._vid;
    }
    get options() {
        return this._options;
    }
    delegateEvents(events) {
        if (!this.el)
            return;
        events = events || utils_2.result(this, 'events') || {};
        debug('%s delegate events %o', this, events);
        this._bindUIElements();
        events = utils_1.normalizeUIKeys(events, this._ui);
        let triggers = this._configureTriggers();
        events = utils_2.extend({}, events, triggers);
        if (!events)
            return this;
        let dels = [];
        for (let key in events) {
            let methods = events[key];
            const match = key.match(/^(\S+)\s*(.*)$/);
            if (!Array.isArray(methods))
                methods = [methods];
            for (let i = 0, ii = methods.length; i < ii; i++) {
                let method = methods[i];
                if (typeof method !== 'function')
                    method = this[method];
                // Set delegates immediately and defer event on this.el
                const boundFn = method; // (<any>method).bind(this); // bind(<Function>method, this);
                if (match[2]) {
                    this.delegate(match[1], match[2], boundFn);
                }
                else {
                    dels.push([match[1], boundFn]);
                }
            }
        }
        dels.forEach(d => { this.delegate(d[0], d[1]); });
        return this;
    }
    undelegateEvents() {
        if (!this.el)
            return this;
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
    delegate(eventName, selector, listener) {
        if (!this.el)
            return this;
        if (typeof selector === 'function') {
            listener = selector;
            selector = undefined;
        }
        let id = utils_2.uniqueId();
        let domEvent = this._domEvents.find(m => m.eventName == eventName && m.selector == selector);
        if (domEvent) {
            id = domEvent.id;
            domEvent.listeners.push(listener);
            return this;
        }
        else {
            domEvent = { id: id, selector: selector, listeners: [listener], eventName: eventName };
        }
        let root = this.el;
        const self = this;
        domEvent.handler = selector ? function (e) {
            let node = (e.target || e.srcElement);
            if (e.delegateTarget)
                return;
            for (; node && node != root; node = node.parentNode) {
                if (node && utils_2.matches(node, selector)) {
                    e.delegateTarget = node;
                    debug("%s trigger %i listeners for '%s'-event on selector '%s'", self, domEvent.listeners.length, domEvent.eventName, domEvent.selector);
                    domEvent.listeners.forEach(listener => listener.call(self, e));
                }
            }
        } : function (e) {
            if (e.delegateTarget)
                return;
            domEvent.listeners.forEach(listener => listener.call(self, e));
        };
        let useCap = !!~unbubblebles.indexOf(eventName) && selector != null;
        debug("%s delegate event '%s'", this, eventName);
        this.el.addEventListener(eventName, domEvent.handler, useCap);
        this._domEvents.push(domEvent);
        return this;
    }
    undelegate(eventName, selector, listener) {
        if (!this.el)
            return this;
        if (typeof selector === 'function') {
            listener = selector;
            selector = undefined;
        }
        var handlers = this._domEvents.slice();
        for (var i = 0, len = handlers.length; i < len; i++) {
            var item = handlers[i];
            var match = item.eventName === eventName &&
                (listener ? !!~item.listeners.indexOf(listener) : true) &&
                (selector ? item.selector === selector : true);
            if (!match)
                continue;
            if ((listener && item.listeners.length == 1) || !listener) {
                debug("%s remove dom eventlistener for event '%s'", this, item.eventName);
                this.el.removeEventListener(item.eventName, item.handler);
                this._domEvents.splice(utils_2.indexOf(handlers, item), 1);
            }
            else {
                debug("%s remove listener for event '%s'", this, item.eventName);
                item.listeners.splice(utils_2.indexOf(item.listeners, listener), 1);
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
    setElement(el) {
        this.undelegateEvents();
        if (this.el && this.options.attachId) {
            debug("%s remove view id attribute", this);
            this.el.removeAttribute('data-vid');
        }
        debug("%s set element", this, el);
        this._el = el;
        if (this.el && this.options.attachId) {
            debug("%s set view id attribute", this);
            this.el.setAttribute('data-vid', this.vid);
        }
        return this;
    }
    getElement() {
        return this._el;
    }
    destroy() {
        debug("%s destroy", this);
        this.setElement(void 0);
        if (this.el && this.options.attachId) {
            this.el.removeAttribute('data-vid');
        }
        this._el = void 0;
        super.destroy();
        return this;
    }
    _bindUIElements() {
        if (!this._ui) {
            return;
        }
        const ui = this._ui;
        Object.keys(ui).forEach((k) => {
            let elm = this.el.querySelectorAll(ui[k]);
            if (elm && elm.length) {
                // unwrap if it's a nodelist.
                if (elm instanceof NodeList) {
                    elm = elm[0];
                }
                debug('%s added ui element %s %s', this, k, ui[k]);
                this.ui[k] = elm;
            }
            else {
                debug('%s ui element not found ', this, k, ui[k]);
            }
        });
    }
    _unbindUIElements() {
        debug("%s unbind ui elements", this);
        this.ui = {};
    }
    _configureTriggers() {
        let triggers = this.triggers || {};
        triggers = utils_1.normalizeUIKeys(triggers, this._ui);
        // Configure the triggers, prevent default
        // action and stop propagation of DOM events
        let events = {}, val, key;
        for (key in triggers) {
            val = triggers[key];
            debug('%s added trigger %s %s', this, key, val);
            events[key] = this._buildViewTrigger(val);
        }
        return events;
    }
    _buildViewTrigger(triggerDef) {
        if (typeof triggerDef === 'string')
            triggerDef = { event: triggerDef };
        let options = utils_2.extend({
            preventDefault: true,
            stopPropagation: true
        }, triggerDef);
        return (e) => {
            if (e) {
                if (e.preventDefault && options.preventDefault) {
                    e.preventDefault();
                }
                if (e.stopPropagation && options.stopPropagation) {
                    e.stopPropagation();
                }
            }
            utils_2.triggerMethodOn(this, options.event, {
                view: this,
            }, e);
        };
    }
    toString() {
        return `[${this.name || this.constructor.name} ${this.vid}]`;
    }
}
exports.BaseView = BaseView;
