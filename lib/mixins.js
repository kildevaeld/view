"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_view_1 = require("./base-view");
const utils_1 = require("./utils");
function ViewMountable(Base) {
    return class extends Base {
        constructor(...args) {
            super(...args);
        }
        render() {
            if (this.el && this._views)
                this._unbindViews(this._views);
            super.render();
            if (this.el && this._views)
                this._bindViews(this._views);
            return this;
        }
        destroy() {
            if (this._views) {
                this._unbindViews(this._views);
            }
            super.destroy();
        }
        _bindViews(views) {
            let el, o;
            for (const key in views) {
                o = views[key];
                el = this.el.querySelector(o.selector);
                if (!el)
                    throw new Error(`No selector ${o.selector} in dom`);
                let view = ViewMountable.Invoker.get(o.view);
                view.setElement(el, false);
                this[key] = view.render();
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
