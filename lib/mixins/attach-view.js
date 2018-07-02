"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_view_1 = require("../base-view");
const utils_1 = require("../utils");
const types_1 = require("../types");
function withAttachedViews(Base) {
    return class extends Base {
        constructor(...args) {
            super(...args);
            if (this.views)
                this._bindViews(this.views);
        }
        render() {
            super.render();
            this._renderViews(this.views);
            return this;
        }
        destroy() {
            if (this.views) {
                this._unbindViews(this.views);
            }
            return super.destroy();
        }
        _bindViews(views) {
            let o;
            for (const key in views) {
                o = views[key];
                let view = types_1.Invoker.get(o.view);
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
                let sel = utils_1.normalizeUIString(o.selector, this._ui || {});
                el = this.el.querySelector(sel);
                if (!el && !o.optional)
                    throw new ReferenceError(`selector "${sel}" for view ${o.view.name} not found in dom`);
                // No element - return!
                if (!el)
                    return;
                let view = this[key];
                if (!view)
                    throw new ReferenceError(`view "${o.view.name}" not mount`);
                view.el = el;
                view.render();
            }
        }
    };
}
exports.withAttachedViews = withAttachedViews;
