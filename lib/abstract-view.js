"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class AbstractView extends types_1.Base {
    get el() { return this._el; }
    set el(el) { this.setElement(el); }
    render() { return this; }
    destroy() {
        return this;
    }
}
exports.AbstractView = AbstractView;
