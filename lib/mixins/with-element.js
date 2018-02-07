"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function withElement(Base) {
    return function (_Base) {
        _inherits(_class, _Base);

        function _class() {
            var _ref;

            _classCallCheck(this, _class);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

            if (!_this.el) _this._ensureElement();
            return _this;
        }

        _createClass(_class, [{
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
                _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "destroy", this).call(this);
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