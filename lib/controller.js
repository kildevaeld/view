"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var abstract_view_1 = require("./abstract-view");

var Controller = function (_abstract_view_1$Abst) {
    babelHelpers.inherits(Controller, _abstract_view_1$Abst);

    function Controller() {
        babelHelpers.classCallCheck(this, Controller);
        return babelHelpers.possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).apply(this, arguments));
    }

    babelHelpers.createClass(Controller, [{
        key: "setElement",
        value: function setElement(el) {
            this._el = el;
            return this;
        }
    }]);
    return Controller;
}(abstract_view_1.AbstractView);

exports.Controller = Controller;