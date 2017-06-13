import { BaseView, BaseViewOptions } from './base-view';
import { result, triggerMethodOn } from './utils';
import { ViewMountable } from './mixins';

export interface ViewOptions extends BaseViewOptions<Element> {
    ensureElement?: string;

}

export class View extends BaseView<Element> {
    readonly options: ViewOptions;



    constructor(options: ViewOptions = { attachId: true }) {
        super(options);
    }

    render() {

        if (this.options.ensureElement) this._ensureElement();

        if (!this.el) return this;
        //triggerMethodOn(this, Events.BeforeRender);
        this.undelegateEvents();
        this.renderTemplate();
        this.delegateEvents();
        //triggerMethodOn(this, Events.Render);
        return this;
    }

    destroy() {
        let data = result(this, 'data');
        let template = result(this, 'template', data);
        if (template)
            this.el!.innerHTML = ''
        super.destroy();
    }

    protected _ensureElement() {
        if (this.el) return;
        let el = document.createElement(this.options.ensureElement!);
        this.setElement(el);
    }

    protected renderTemplate() {

        if (!this.el) return;
        let data = result(this, 'data');
        let template = result(this, 'template', data);
        if (!template) return;

        this.el.innerHTML = template;

    }

}

export const LayoutView = ViewMountable(View);


