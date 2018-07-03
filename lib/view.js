"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var base_view_1 = require("./base-view");

var View = function (_base_view_1$BaseView) {
    babelHelpers.inherits(View, _base_view_1$BaseView);

    function View() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { attachId: true };
        babelHelpers.classCallCheck(this, View);
        return babelHelpers.possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, options));
    }

    return View;
}(base_view_1.BaseView);

exports.View = View;