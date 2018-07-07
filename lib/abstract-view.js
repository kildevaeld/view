"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@viewjs/utils");
class AbstractView extends utils_1.Base {
    get el() { return this.getElement(); }
    set el(el) { this.setElement(el); }
    render() { return this; }
    destroy() { return this; }
}
exports.AbstractView = AbstractView;
