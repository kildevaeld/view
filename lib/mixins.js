"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = require("./view");
const container_1 = require("./container");
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
    };
}
exports.ViewMountable = ViewMountable;
