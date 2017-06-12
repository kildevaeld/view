"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view_1 = require("./view");
const utils_1 = require("./utils");
class View extends view_1.BaseView {
    render() {
        console.log(this);
        if (!this.el)
            return this;
        utils_1.triggerMethodOn(this, 'before:render', this);
        this.undelegateEvents();
        this.renderTemplate();
        this.delegateEvents();
        utils_1.triggerMethodOn(this, 'render', this);
        return this;
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
