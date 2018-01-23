
import { Constructor, IView } from '../types';
import { result, isFunction, isString, isElement } from '../utils'

export interface IViewTemplate<M> {
    model: M
    /**
     * Template 
     * 
     * 
     * @memberof IViewTemplate
     */
    template?: string | ((data: M) => string | Element);
    getTemplateData(): any;
    renderTemplate(): void
}

export function withTemplate<T extends Constructor<IView>, M = any>(Base: T): Constructor<IViewTemplate<M>> & T {
    return class extends Base {
        model: M
        getTemplateData() {
            let data = result(this, 'model') || {};
            return data;
        }

        render() {
            if (!this.el) return this;
            if (isFunction((this as any).undelegateEvents))
                (this as any).undelegateEvents();
            this.renderTemplate();
            return super.render();
        }

        destroy() {
            let data = this.getTemplateData();
            try {
                let template = result(this, 'template', data);
                if (template && this.el)
                    this.el!.innerHTML = ''
            } catch (e) { }

            return super.destroy();
        }

        renderTemplate() {

            if (!this.el) return;
            let data = this.getTemplateData();
            let template = result(this, 'template', data);
            if (!template) return;
            if (isString(template))
                this.el.innerHTML = template;
            else if (isElement(template)) {
                this.el.appendChild(template);
            } else {
                this.el.innerHTML = '';
            }

        }

    }
}