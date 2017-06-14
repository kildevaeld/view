"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_view_1 = require("./base-view");
const utils_1 = require("./utils");
const mixins_1 = require("./mixins");
class View extends base_view_1.BaseView {
    constructor(options = { attachId: true }) {
        super(options);
    }
    render() {
        if (this.options.ensureElement)
            this._ensureElement();
        if (!this.el)
            return this;
        this.undelegateEvents();
        this.renderTemplate();
        this.delegateEvents();
        return this;
    }
    destroy() {
        let data = utils_1.result(this, 'data');
        let template = utils_1.result(this, 'template', data);
        if (template)
            this.el.innerHTML = '';
        super.destroy();
    }
    _ensureElement() {
        if (this.el)
            return;
        let el = document.createElement(this.options.ensureElement);
        this.setElement(el);
    }
    renderTemplate() {
        if (!this.el)
            return;
        let data = utils_1.result(this, 'data');
        let template = utils_1.result(this, 'template', data);
        if (!template)
            return;
        this.el.innerHTML = template;
    }
}
exports.View = View;
exports.LayoutView = mixins_1.ViewMountable(View);
