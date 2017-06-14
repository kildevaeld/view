"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_view_1 = require("./base-view");
const utils_1 = require("./utils");
const event_emitter_1 = require("./event-emitter");
function ViewMountable(Base) {
    return class extends Base {
        constructor(...args) {
            super(...args);
            if (this._views)
                this._bindViews(this._views);
        }
        render() {
            super.render();
            this._renderViews(this._views);
            return this;
        }
        destroy() {
            if (this._views) {
                this._unbindViews(this._views);
            }
            super.destroy();
        }
        _bindViews(views) {
            let o;
            for (const key in views) {
                o = views[key];
                let view = ViewMountable.Invoker.get(o.view);
                this[key] = view;
            }
        }
        _unbindViews(views) {
            const self = this;
            for (const key in views) {
                if (self[key] && self[key] instanceof base_view_1.BaseView) {
                    self[key].destroy();
                    self[key] = void 0;
                }
            }
        }
        _renderViews(views) {
            let el, o;
            for (const key in views) {
                o = views[key];
                let sel = base_view_1.normalizeUIString(o.selector, this._ui || {});
                el = this.el.querySelector(sel);
                if (!el)
                    throw new Error(`No selector ${sel} in dom`);
                let view = this[key];
                if (!view)
                    throw new Error('view not mounted');
                view.setElement(el, false);
                view.render();
            }
        }
    };
}
exports.ViewMountable = ViewMountable;
(function (ViewMountable) {
    ViewMountable.Invoker = {
        get(V) {
            return new V();
        }
    };
})(ViewMountable = exports.ViewMountable || (exports.ViewMountable = {}));
var Events;
(function (Events) {
    Events.BeforeRender = "before:render";
    Events.Render = "render";
    Events.BeforeSetElement = "before:set:element";
    Events.SetElement = "set:element";
    Events.BeforeDelegateEvents = "before:delegate:events";
    Events.DelegateEvents = "delegate:events";
    Events.BeforeUndelegateEvents = "before:undelegate:events";
    Events.UndelegateEvents = "undelegate:events";
    Events.BeforeDestroy = "before:destroy";
    Events.Destroy = "destroy";
})(Events = exports.Events || (exports.Events = {}));
function ViewObservable(Base) {
    return class extends Base {
        render() {
            utils_1.triggerMethodOn(this, Events.BeforeRender);
            super.render();
            utils_1.triggerMethodOn(this, Events.Render);
            return this;
        }
        setElement(el, trigger) {
            utils_1.triggerMethodOn(this, Events.BeforeSetElement);
            super.setElement(el, trigger);
            utils_1.triggerMethodOn(this, Events.SetElement);
            return this;
        }
        delegateEvents(events) {
            utils_1.triggerMethodOn(this, Events.BeforeDelegateEvents);
            super.delegateEvents(events);
            utils_1.triggerMethodOn(this, Events.DelegateEvents);
            return this;
        }
        undelegateEvents() {
            utils_1.triggerMethodOn(this, Events.BeforeUndelegateEvents);
            super.undelegateEvents();
            utils_1.triggerMethodOn(this, Events.UndelegateEvents);
            return this;
        }
        destroy() {
            utils_1.triggerMethodOn(this, Events.BeforeDestroy);
            const off = this.off;
            this.off = () => { };
            super.destroy();
            this.off = off;
            utils_1.triggerMethodOn(this, Events.Destroy);
            this.off();
        }
    };
}
exports.ViewObservable = ViewObservable;
function EventListener(Base) {
    return class extends Base {
        listenTo(obj, event, fn, ctx, once = false) {
            if (!event_emitter_1.isEventEmitter(obj)) {
                //if (EventEmitter.throwOnError)
                //    throw new EventEmitterError("obj is not an EventEmitter", once ? "listenToOnce" : "listenTo", this, obj);
                return this;
            }
            let listeningTo, id, meth;
            listeningTo = this._listeningTo || (this._listeningTo = {});
            id = obj.listenId || (obj.listenId = utils_1.uniqueId());
            listeningTo[id] = obj;
            meth = once ? 'once' : 'on';
            obj[meth](event, fn, ctx || this);
            return this;
        }
        listenToOnce(obj, event, fn, ctx) {
            return this.listenTo(obj, event, fn, ctx, true);
        }
        stopListening(obj, event, callback) {
            if (obj && !event_emitter_1.isEventEmitter(obj)) {
                //if (EventEmitter.throwOnError)
                //    throw new EventEmitterError("obj is not an EventEmitter", "stopListening", this, obj);
                return this;
            }
            let listeningTo = this._listeningTo;
            if (!listeningTo)
                return this;
            var remove = !event && !callback;
            if (!callback && typeof event === 'object')
                callback = this;
            if (obj)
                (listeningTo = {})[obj.listenId] = obj;
            for (var id in listeningTo) {
                obj = listeningTo[id];
                obj.off(event, callback, this);
                if (remove || !Object.keys(obj.listeners).length)
                    delete this._listeningTo[id];
            }
            return this;
        }
        destroy() {
            if (typeof Base.prototype.destroy === 'function')
                Base.prototype.destroy.call(this);
            this.stopListening();
        }
    };
}
exports.EventListener = EventListener;
