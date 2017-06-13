"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const abstract_view_1 = require("./abstract-view");
const mixins_1 = require("./mixins");
var Events;
(function (Events) {
    Events.BeforeSetElement = "before:set:element";
    Events.SetElement = "set:element";
})(Events || (Events = {}));
class Controller extends abstract_view_1.AbstractView {
    setElement(el, trigger = false) {
        if (this._el == el) {
            return;
        }
        if (trigger)
            utils_1.triggerMethodOn(this, Events.BeforeSetElement, this._el, el);
        this._el = el;
        if (trigger)
            utils_1.triggerMethodOn(this, Events.SetElement, this._el, el);
    }
}
exports.Controller = Controller;
class ViewController extends mixins_1.ViewMountable(Controller) {
}
exports.ViewController = ViewController;
