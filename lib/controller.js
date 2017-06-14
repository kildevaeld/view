"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_view_1 = require("./abstract-view");
const mixins_1 = require("./mixins");
class Controller extends abstract_view_1.AbstractView {
    setElement(el, _ = false) {
        if (this._el == el) {
            return;
        }
        this._el = el;
    }
}
exports.Controller = Controller;
class ViewController extends mixins_1.ViewMountable(Controller) {
}
exports.ViewController = ViewController;
