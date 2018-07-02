"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@viewjs/utils");
function withElement(Base) {
    return class extends Base {
        constructor(...args) {
            super(...args);
            if (!this.el)
                this._ensureElement();
        }
        _ensureElement() {
            if (this.el)
                return;
            const tagName = utils_1.getOption('tagName', [this.options, this]) || 'div', className = utils_1.getOption('className', [this.options, this]), attr = utils_1.getOption('attributes', [this.options, this]), el = document.createElement(tagName);
            if (className) {
                // IE < 11 does not support multiple arguments in add/remove
                className.split(' ').map(m => m.trim())
                    .forEach(cl => el.classList.add(cl));
            }
            if (attr) {
                for (let key in attr) {
                    el.setAttribute(key, attr[key]);
                }
            }
            this.el = el;
        }
        remove() {
            if (this.el && this.el.parentNode) {
                if (typeof this.undelegateEvents === 'function')
                    this.undelegateEvents();
                this.el.parentNode.removeChild(this.el);
                this.el = void 0;
            }
            return this;
        }
        destroy() {
            super.destroy();
            if (this.el && this.__created) {
                this.remove();
            }
            return this;
        }
    };
}
exports.withElement = withElement;
