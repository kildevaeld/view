"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var AbstractView = function () {
    function AbstractView() {
        babelHelpers.classCallCheck(this, AbstractView);
    }

    babelHelpers.createClass(AbstractView, [{
        key: "render",
        value: function render() {
            return this;
        }
    }, {
        key: "destroy",
        value: function destroy() {
            return this;
        }
    }, {
        key: "el",
        get: function get() {
            return this._el;
        },
        set: function set(el) {
            this.setElement(el);
        }
    }]);
    return AbstractView;
}();

exports.AbstractView = AbstractView;