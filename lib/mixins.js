"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_view_1 = require("./base-view");
function ViewMountable(Base) {
    return class extends Base {
        constructor(...args) {
            super(...args);
        }
        render() {
            if (!this.el || !this._views)
                return this;
            this._unbindViews(this._views);
            super.render();
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
        get(View) {
            return new View();
        }
    };
})(ViewMountable = exports.ViewMountable || (exports.ViewMountable = {}));
function view(selector) {
    return function (target, prop) {
        let View = Reflect.getOwnMetadata("design:type", target, prop);
        if (!View)
            throw new Error('design:type does not exists');
        if (!target._views)
            target._views = {};
        //transient(View);
        target._views[prop] = {
            selector: selector,
            view: View
        };
    };
}
exports.view = view;
