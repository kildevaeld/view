import { BaseView } from './view';
import { result, triggerMethodOn } from './utils';

export class View<T extends Element> extends BaseView<T> {


    render() {
        console.log(this)
        if (!this.el) return this;
        triggerMethodOn(this, 'before:render', this);
        this.undelegateEvents();
        this.renderTemplate();
        this.delegateEvents();
        triggerMethodOn(this, 'render', this);
        return this;
    }


    protected renderTemplate() {

        if (!this.el) return;
        let data = result(this, 'data');
        let template = result(this, 'template', data);
        if (!template) return;

        this.el.innerHTML = template;

    }

}