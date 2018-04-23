"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
function withTemplate(Base) {
    return function (_Base) {
        _inherits(_class, _Base);

        function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
            key: "getTemplateData",
            value: function getTemplateData() {
                var data = utils_1.result(this, 'model') || {};
                return data;
            }
        }, {
            key: "render",
            value: function render() {
                if (!this.el) return this;
                if (utils_1.isFunction(this.undelegateEvents)) this.undelegateEvents();
                this.renderTemplate();
                return _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "render", this).call(this);
            }
        }, {
            key: "destroy",
            value: function destroy() {
                var data = this.getTemplateData();
                try {
                    var template = utils_1.result(this, 'template', data);
                    if (template && this.el) this.el.innerHTML = '';
                } catch (e) {}
                return _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "destroy", this).call(this);
            }
        }, {
            key: "renderTemplate",
            value: function renderTemplate() {
                if (!this.el) return;
                var data = this.getTemplateData();
                var template = utils_1.result(this, 'template', data);
                if (!template) return;
                if (utils_1.isString(template)) this.el.innerHTML = template;else if (utils_1.isElement(template)) {
                    this.el.appendChild(template);
                } else {
                    this.el.innerHTML = '';
                }
            }
        }]);

        return _class;
    }(Base);
}
exports.withTemplate = withTemplate;