"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_view_1 = require("./abstract-view");
class Controller extends abstract_view_1.AbstractView {
    setElement(el) {
        this._el = el;
        return this;
    }
}
exports.Controller = Controller;
