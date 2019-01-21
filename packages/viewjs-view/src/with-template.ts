import { result, isFunction, isString, debug as Debug, pick, isPromise, AnyMap, Constructor, Destroyable } from '@viewjs/utils'
import { IRenderer, IView, TemplateRef, isRenderer } from './types';
import { View, BaseViewOptions } from './base-view';
import { isViewLike } from './utils';

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

export class TemplateRenderer<M> implements IRenderer {

    constructor(private templ: string | ((args?: M) => string)) { }

    mount(attributes: M, container: Element, _prev: Element | undefined): TemplateRef | PromiseLike<TemplateRef> {

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


export class ViewRenderer<V extends IView, M = AnyMap> implements IRenderer, Destroyable {

    private created = false;

    constructor(private view: V) { }


    mount(attributes: M, container: Element, _prev: Element | undefined): TemplateRef | PromiseLike<TemplateRef> {
        if (isFunction((this.view as any).ensureElement)) {
            (this.view as any).ensureElement();
        }

        if (!this.view.el) {
            this.created = true;
            this.view.el = document.createElement('div');
        }

        (this.view as any).model = attributes;

        this.view.render();
        if (this.view.el.parentElement != container) {
            container.appendChild(this.view.el!);
        }

        return this.view;

    }

    unmount(el: TemplateRef): boolean {
        if (el !== this.view) {
            return false;
        }
        if (this.created && this.view.el)
            this.view.el!.remove();
        return true;
    }

    destroy() {
        if (this.view) this.view.destroy();
        return this;
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
            } else if (isViewLike(this.template)) {
                this._renderer = new ViewRenderer(this.template);
            } else if (isRenderer(this.template)) {
                this._renderer = this.template;
            } else if (this.template) {
                console.error("template should be a string, a function returning a string, or a renderer or a renderer");
            }

            return this._renderer;
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