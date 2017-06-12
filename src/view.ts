import { BaseView, Events } from './base-view';
import { result, triggerMethodOn } from './utils';

export class View extends BaseView<Element> {


    render() {
        if (!this.el) return this;
        triggerMethodOn(this, Events.BeforeRender);
        this.undelegateEvents();
        this.renderTemplate();
        this.delegateEvents();
        triggerMethodOn(this, Events.Render);
        return this;
    }

    destroy() {
        let data = result(this, 'data');
        let template = result(this, 'template', data);
        if (template)
            this.el!.innerHTML = ''
        super.destroy();
    }

    protected renderTemplate() {

        if (!this.el) return;
        let data = result(this, 'data');
        let template = result(this, 'template', data);
        if (!template) return;

        this.el.innerHTML = template;

    }

}


