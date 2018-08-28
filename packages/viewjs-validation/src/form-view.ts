import { TemplateView, BaseViewOptions } from '@viewjs/view';
import { withModel, IModel } from '@viewjs/models';
import { html } from '@viewjs/html';
import { ValueBinding, withBindings } from '@viewjs/bind';

export interface FormViewOptions extends BaseViewOptions<HTMLFormElement> {
    fieldAttribute?: string
}

export class FormView extends withBindings(withModel(TemplateView)) {
    readonly options!: FormViewOptions;

    bindings = () => {
        const attr = this.options.fieldAttribute!
        return html(this.el!).find(`[${attr}]`)
            .map(m => {
                return {
                    selector: m,
                    prop: m.getAttribute(attr)!,
                    binding: (el: Element, model: IModel, prop: string) => new ValueBinding(el, model, prop)
                }
            });
    }

    constructor(options?: FormViewOptions) {
        super(Object.assign({
            fieldAttribute: 'name'
        }, options));
    }

    setElement(el: HTMLElement) {
        if (el.tagName.toLowerCase() != 'form') throw new TypeError('element should be a form');
        return super.setElement(el);
    }

}