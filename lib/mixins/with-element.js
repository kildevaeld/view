"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@viewjs/utils");
function withElement(Base) {
    return function (_Base) {
        babelHelpers.inherits(_class, _Base);

        function _class() {
            var _ref;

            babelHelpers.classCallCheck(this, _class);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = babelHelpers.possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

            if (!_this.el) _this._ensureElement();
            return _this;
        }

        babelHelpers.createClass(_class, [{
            key: "_ensureElement",
            value: function _ensureElement() {
                if (this.el) return;
                var tagName = utils_1.getOption('tagName', [this.options, this]) || 'div',
                    className = utils_1.getOption('className', [this.options, this]),
                    attr = utils_1.getOption('attributes', [this.options, this]),
                    el = document.createElement(tagName);
                if (className) {
                    // IE < 11 does not support multiple arguments in add/remove
                    className.split(' ').map(function (m) {
                        return m.trim();
                    }).forEach(function (cl) {
                        return el.classList.add(cl);
                    });
                }
                if (attr) {
                    for (var key in attr) {
                        el.setAttribute(key, attr[key]);
                    }
                }
                this.el = el;
            }
        }, {
            key: "remove",
            value: function remove() {
                if (this.el && this.el.parentNode) {
                    if (typeof this.undelegateEvents === 'function') this.undelegateEvents();
                    this.el.parentNode.removeChild(this.el);
                    this.el = void 0;
                }
                return this;
            }
        }, {
            key: "destroy",
            value: function destroy() {
                babelHelpers.get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "destroy", this).call(this);
                if (this.el && this.__created) {
                    this.remove();
                }
                return this;
            }
        }]);
        return _class;
    }(Base);
}
exports.withElement = withElement;