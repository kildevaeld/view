"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@viewjs/utils");
function withTemplate(Base) {
    return function (_Base) {
        babelHelpers.inherits(_class, _Base);

        function _class() {
            babelHelpers.classCallCheck(this, _class);
            return babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        babelHelpers.createClass(_class, [{
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
                return babelHelpers.get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "render", this).call(this);
            }
        }, {
            key: "destroy",
            value: function destroy() {
                var data = this.getTemplateData();
                try {
                    var template = utils_1.result(this, 'template', data);
                    if (template && this.el) this.el.innerHTML = '';
                } catch (e) {}
                return babelHelpers.get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "destroy", this).call(this);
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