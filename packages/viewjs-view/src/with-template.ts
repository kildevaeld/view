import { result, isFunction, isString, debug as Debug, pick, isPromise, AnyMap, Constructor } from '@viewjs/utils'
import { IRenderer, IView, TemplateRef } from './types';
import { View, BaseViewOptions } from './base-view';

const debug = Debug("withTemplate");

export type TemplateType<T = AnyMap> = IRenderer | string | ((args?: T) => string);

export interface IViewTemplate<M> {
    model?: M | (() => M);
    /**
     * Template 
     * 
     * 
     * @memberof IViewTemplate
     */
    template?: TemplateType<M>;
    getTemplateData(): any;
    //renderTemplate(): void
}

export class TemplateRenderer<M> {

    constructor(private templ: string | ((args?: M) => string)) { }

    mount(attributes: M, container: Element, _prev: Element | undefined): Element {

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
        const ok = el.innerHTML != '';
        el.innerHTML = '';
        return ok;
    }
}

interface TemplatePrivates {
    renderer: IRenderer | undefined;
    templateElement: Element | undefined;
}

var privates: WeakMap<any, TemplatePrivates>;

export function withTemplate<T extends Constructor<IView>, M extends any = any>(Base: T): T & Constructor<IViewTemplate<M>> {

    if (!privates) {
        privates = new WeakMap();
    }

    return class extends Base implements IViewTemplate<M> {

        //static inherit = inherit;

        _renderer: IRenderer | undefined;
        _templateEl: TemplateRef | undefined;

        model?: M | (() => M);
        template?: TemplateType<M>;

        getTemplateData() {
            let data: any = result(this, 'model') || {};
            if (isFunction(data.toJSON))
                data = data.toJSON();
            debug("%s get template data:", this, data);
            return data;
        }

        render() {
            if (!this.el) return this;
            if (isFunction((this as any).undelegateEvents))
                (this as any).undelegateEvents();
            this.renderTemplate(() => super.render());
            return this
        }

        destroy() {
            if (this._renderer && this._templateEl) {
                this._renderer.unmount(this._templateEl);
                this._templateEl = void 0;
                this._renderer = void 0;
            }

            return super.destroy();
        }

        renderTemplate(done?: () => any) {

            const template = this.resolveTemplate(),
                container = this.resolveContainer();

            if (!template || !container) return;

            const result = template.mount(this.getTemplateData(), container, this._templateEl)

            if (isPromise(result)) {
                result.then(m => {
                    this._templateEl = m;
                    done && done();
                })
                return;
            }

            this._templateEl = result;
            done && done();


        }

        resolveTemplate() {

            if (this._renderer) return this._renderer;
            if (isString(this.template) || isFunction(this.template)) {
                this._renderer = new TemplateRenderer(this.template);
                return this._renderer;
            }

            return this.template
        }

        resolveContainer() {
            return this.el;
        }
    }
}

export interface TemplateViewOptions<ModelType = any> extends BaseViewOptions<HTMLElement> {
    template?: TemplateType<ModelType>;
    model?: ModelType;
}

export class TemplateView<ModelType = any> extends withTemplate<Constructor<View<HTMLElement>>>(View) {
    template?: TemplateType<ModelType>;
    model?: ModelType;
    readonly options!: TemplateViewOptions<ModelType>;

    constructor(options?: TemplateViewOptions<ModelType>) {
        super(options);
        Object.assign(this, pick(this.options, ['template', 'model']));
    }
}