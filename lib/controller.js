"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { triggerMethodOn } from './utils'
const abstract_view_1 = require("./abstract-view");
const mixins_1 = require("./mixins");
/*namespace Events {
    export const BeforeSetElement = "before:set:element";
    export const SetElement = "set:element";
}*/
class Controller extends abstract_view_1.AbstractView {
    setElement(el, trigger = false) {
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
