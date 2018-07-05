"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const utils_1 = require("@viewjs/utils");
const debug = types_1.debug("withTemplate");
function withTemplate(Base) {
    return class extends Base {
        getTemplateData() {
            let data = utils_1.result(this, 'model') || {};
            debug("%s get template data", this);
            return data;
        }
        render() {
            if (!this.el)
                return this;
            if (utils_1.isFunction(this.undelegateEvents))
                this.undelegateEvents();
            this.renderTemplate();
            return super.render();
        }
        destroy() {
            let data = this.getTemplateData();
            try {
                let template = utils_1.result(this, 'template', data);
                if (template && this.el)
                    this.el.innerHTML = '';
            }
            catch (e) { }
            return super.destroy();
        }
        renderTemplate() {
            if (!this.el)
                return;
            let data = this.getTemplateData();
            let template = utils_1.result(this, 'template', data);
            if (!template)
                return;
            debug("%s render template", this);
            if (utils_1.isString(template))
                this.el.innerHTML = template;
            else if (utils_1.isElement(template)) {
                this.el.appendChild(template);
            }
            else {
                this.el.innerHTML = '';
            }
        }
    };
}
exports.withTemplate = withTemplate;
