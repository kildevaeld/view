"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_view_1 = require("./base-view");
const utils_1 = require("./utils");
class View extends base_view_1.BaseView {
    render() {
        if (!this.el)
            return this;
        utils_1.triggerMethodOn(this, base_view_1.Events.BeforeRender);
        this.undelegateEvents();
        this.renderTemplate();
        this.delegateEvents();
        utils_1.triggerMethodOn(this, base_view_1.Events.Render);
        return this;
    }
    destroy() {
        let data = utils_1.result(this, 'data');
        let template = utils_1.result(this, 'template', data);
        if (template)
            this.el.innerHTML = '';
        super.destroy();
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
