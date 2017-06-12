"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const abstract_view_1 = require("./abstract-view");
//import * as Debug from 'debug';
const dom = require("./dom");
const debug = (..._) => { }; //Debug("views");
const kUIRegExp = /@ui.([a-zA-Z_\-\$#]+)/i;
const unbubblebles = 'focus blur change'.split(' ');
function normalizeUIKeys(obj, uimap) {
    let o = {}, k, v, ms, sel, ui;
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
exports.normalizeUIKeys = normalizeUIKeys;
var Events;
(function (Events) {
    Events.BeforeRender = "before:render";
    Events.Render = "render";
    Events.BeforeSetElement = "before:set:element";
    Events.SetElement = "set:element";
    Events.BeforeDelegateEvents = "before:delegate:events";
    Events.DelegateEvents = "delegate:events";
    Events.UndelegateEvents = "undelegate:events";
})(Events = exports.Events || (exports.Events = {}));
class BaseView extends abstract_view_1.AbstractView {
    constructor(options = {}) {
        super();
        //this._el = options.el;
        this.setElement(options.el, false);
        this._domEvents = [];
    }
    static find(selector, context) {
        return context.querySelectorAll(selector);
    }
    delegateEvents(events) {
        if (!this.el)
            return;
        this._bindUIElements();
        events = events || this.events || {}; //result(this, 'events');
        events = normalizeUIKeys(events, this._ui);
        let triggers = this._configureTriggers();
        events = utils_1.extend({}, events, triggers);
        debug('%s delegate events %j', this, events);
        if (!events)
            return this;
        //if (!(events || (events = result(this, 'events')))) return this;
        this.undelegateEvents();
        let dels = [];
        for (let key in events) {
            let method = events[key];
            if (typeof method !== 'function')
                method = this[method];
            let match = key.match(/^(\S+)\s*(.*)$/);
            // Set delegates immediately and defer event on this.el
            let boundFn = method.bind(this); // bind(<Function>method, this);
            if (match[2]) {
                this.delegate(match[1], match[2], boundFn);
            }
            else {
                dels.push([match[1], boundFn]);
            }
        }
        dels.forEach(d => { this.delegate(d[0], d[1]); });
        return this;
    }
    undelegateEvents() {
        if (!this.el)
            return this;
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
    delegate(eventName, selector, listener) {
        if (!this.el)
            return this;
        if (typeof selector === 'function') {
            listener = selector;
            selector = undefined;
        }
        let root = this.el;
        let handler = selector ? function (e) {
            let node = (e.target || e.srcElement);
            // Already handled
            if (e.delegateTarget)
                return;
            for (; node && node != root; node = node.parentNode) {
                if (node && dom.matches(node, selector)) {
                    e.delegateTarget = node;
                    listener(e);
                }
            }
        } : function (e) {
            if (e.delegateTarget)
                return;
            listener(e);
        };
        let useCap = !!~unbubblebles.indexOf(eventName) && selector != null;
        debug('%s delegate event %s ', this, eventName);
        dom.addEventListener(this.el, eventName, handler, useCap);
        this._domEvents.push({ eventName: eventName, handler: handler, listener: listener, selector: selector });
        return handler;
    }
    undelegate(eventName, selector, listener) {
        if (!this.el)
            return this;
        if (typeof selector === 'function') {
            listener = selector;
            selector = undefined;
        }
        if (this.el) {
            var handlers = this._domEvents.slice();
            for (var i = 0, len = handlers.length; i < len; i++) {
                var item = handlers[i];
                var match = item.eventName === eventName &&
                    (listener ? item.listener === listener : true) &&
                    (selector ? item.selector === selector : true);
                if (!match)
                    continue;
                dom.removeEventListener(this.el, item.eventName, item.handler);
                this._domEvents.splice(dom.indexOf(handlers, item), 1);
            }
        }
        return this;
    }
    render() {
        utils_1.triggerMethodOn(this, Events.BeforeRender);
        this.undelegateEvents();
        this.delegateEvents();
        utils_1.triggerMethodOn(this, Events.Render);
        return this;
    }
    setElement(el, trigger = true) {
        utils_1.triggerMethodOn(this, Events.BeforeSetElement);
        if (trigger)
            this.undelegateEvents();
        this._el = el;
        if (trigger)
            this.delegateEvents();
        utils_1.triggerMethodOn(this, Events.SetElement);
        return this;
    }
    destroy() {
        this.undelegateEvents();
        this.off();
        return this;
    }
    _bindUIElements() {
        let ui = this.ui;
        if (!ui)
            return;
        if (!this._ui) {
            this._ui = ui;
        }
        ui = this._ui;
        this.ui = {};
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
    }
    _configureTriggers() {
        let triggers = this.triggers || {};
        triggers = normalizeUIKeys(triggers, this._ui);
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
        let options = utils_1.extend({
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
            utils_1.triggerMethodOn(this, options.event, {
                view: this,
            }, e);
        };
    }
}
exports.BaseView = BaseView;
