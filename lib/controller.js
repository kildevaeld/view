"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = require("./view");
const event_emitter_1 = require("./event-emitter");
const utils_1 = require("./utils");
const container_1 = require("./container");
const slick_di_1 = require("slick-di");
exports.Views = Symbol.for('Views');
var Events;
(function (Events) {
    Events.BeforeSetElement = "before:set:element";
    Events.SetElement = "set:element";
    Events.BeforeRender = "before:render";
    Events.Render = "render";
})(Events = exports.Events || (exports.Events = {}));
class Controller extends event_emitter_1.EventEmitter {
    get el() {
        return this._el;
    }
    set el(el) {
        this.setElement(el);
    }
    render() {
        if (!this.el || !this._views)
            return;
        utils_1.triggerMethodOn(this, Events.BeforeRender);
        this._unbindViews(this._views);
        this._bindViews(this._views);
        utils_1.triggerMethodOn(this, Events.Render);
        return this;
    }
    destroy() {
        if (this._views) {
            this._unbindViews(this._views);
        }
        this.off();
    }
    setElement(el, trigger = false) {
        if (this._el == el) {
            return this;
        }
        if (this._el && this._views)
            this._unbindViews(this._views);
        utils_1.triggerMethodOn(this, Events.BeforeSetElement, this._el, el);
        this._el = el;
        utils_1.triggerMethodOn(this, Events.SetElement, this._el, el);
    }
    _bindViews(views) {
        let el, o;
        for (const key in views) {
            o = views[key];
            el = this.el.querySelector(o.selector);
            if (!el)
                throw new Error(`No selector ${o.selector} in dom`);
            //let view = new o.view();
            let view = container_1.container().get(o.view);
            view.setElement(el, false);
            this[key] = view.render();
        }
    }
    _unbindViews(views) {
        const self = this;
        for (const key in views) {
            if (self[key] && self[key] instanceof view_1.BaseView) {
                self[key].destroy();
                self[key] = void 0;
            }
        }
    }
}
exports.Controller = Controller;
function view(selector) {
    return function (target, prop) {
        let View = Reflect.getOwnMetadata("design:type", target, prop);
        if (!View)
            throw new Error('design:type does not exists');
        if (!target._views)
            target._views = {};
        slick_di_1.transient(View);
        target._views[prop] = {
            selector: selector,
            view: view
        };
    };
}
exports.view = view;
