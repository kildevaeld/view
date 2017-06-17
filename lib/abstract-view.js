"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractView {
    get el() { return this._el; }
    set el(el) { this.setElement(el); }
    render() { return this; }
    destroy() {
        //this.off();
    }
}
exports.AbstractView = AbstractView;
