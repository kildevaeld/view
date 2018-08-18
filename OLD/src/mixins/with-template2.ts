import { IView } from '../types';
import { result, isFunction, isString, debug as Debug, Constructor } from '@viewjs/utils'
import { IRenderer, AnyMap } from '../types';

const debug = Debug("withTemplate");

export type TemplateType = IRenderer | string | ((args?: AnyMap) => string);

export interface IViewTemplate<M> {
    model?: M
    /**
     * Template 
     * 
     * 
     * @memberof IViewTemplate
     */
    template?: TemplateType;
    getTemplateData(): any;
    renderTemplate(): void
}

export class TemplateRenderer {

    constructor(private templ: string | ((args?: AnyMap) => string)) { }

    mount(attributes: AnyMap<any>, container: Element, prev: Element | undefined): Element {

        let result: string | undefined;
        if (isFunction(this.templ)) {
            result = this.templ(attributes);
        } else {
            result = this.templ;
        }

        container.innerHTML = result;

        return container;

    }
    unmount(el: Element): boolean {
        const ok = el.innerHTML != ''
        el.innerHTML = ''

        return ok;
    }
}

// var privates: WeakMap<any, any>;

export function withTemplate<T extends Constructor<IView>, M = any>(Base: T): Constructor<IViewTemplate<M>> & T {
    return class extends Base {
        private _renderer: IRenderer | undefined;
        private _templateEl: Element | undefined;

        model?: M
        template?: TemplateType;

        getTemplateData() {
            let data = result(this, 'model') || {};
            debug("%s get template data", this);
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
            if (this._renderer && this._templateEl) {
                this._renderer.unmount(this._templateEl);
                this._templateEl = void 0;
                this._renderer = void 0;
            }

            return super.destroy();
        }

        renderTemplate() {

            const template = this.resolveTemplate(),
                container = this.resolveContainer();

            if (!template || !container) return;

            this._templateEl = template.mount(this.getTemplateData(), container, this._templateEl)

        }

        protected resolveTemplate() {

            if (this._renderer) return this._renderer;
            if (isString(this.template) || isFunction(this.template)) {
                this._renderer = new TemplateRenderer(this.template);
                return this._renderer;
            }

            return this.template
        }

        protected resolveContainer() {
            return this.el;
        }


    }
}