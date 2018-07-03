"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var base_view_1 = require("../base-view");
var utils_1 = require("../utils");
var types_1 = require("../types");
function withAttachedViews(Base) {
    return function (_Base) {
        babelHelpers.inherits(_class, _Base);

        function _class() {
            var _ref;

            babelHelpers.classCallCheck(this, _class);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = babelHelpers.possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

            if (_this.views) _this._bindViews(_this.views);
            return _this;
        }

        babelHelpers.createClass(_class, [{
            key: "render",
            value: function render() {
                babelHelpers.get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "render", this).call(this);
                this._renderViews(this.views);
                return this;
            }
        }, {
            key: "destroy",
            value: function destroy() {
                if (this.views) {
                    this._unbindViews(this.views);
                }
                return babelHelpers.get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "destroy", this).call(this);
            }
        }, {
            key: "_bindViews",
            value: function _bindViews(views) {
                var o = void 0;
                for (var key in views) {
                    o = views[key];
                    var view = types_1.Invoker.get(o.view);
                    this[key] = view;
                }
            }
        }, {
            key: "_unbindViews",
            value: function _unbindViews(views) {
                var self = this;
                for (var key in views) {
                    if (self[key] && self[key] instanceof base_view_1.BaseView) {
                        self[key].destroy();
                        self[key] = void 0;
                    }
                }
            }
        }, {
            key: "_renderViews",
            value: function _renderViews(views) {
                var el = void 0,
                    o = void 0;
                for (var key in views) {
                    o = views[key];
                    var sel = utils_1.normalizeUIString(o.selector, this._ui || {});
                    el = this.el.querySelector(sel);
                    if (!el && !o.optional) throw new ReferenceError("selector \"" + sel + "\" for view " + o.view.name + " not found in dom");
                    // No element - return!
                    if (!el) return;
                    var view = this[key];
                    if (!view) throw new ReferenceError("view \"" + o.view.name + "\" not mount");
                    view.el = el;
                    view.render();
                }
            }
        }]);
        return _class;
    }(Base);
}
exports.withAttachedViews = withAttachedViews;