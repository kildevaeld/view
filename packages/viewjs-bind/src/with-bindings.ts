import { View, EventsMap, IView } from '@viewjs/view';
import { IModelController, IModel } from '@viewjs/models';
import { html } from '@viewjs/html';
import { isString, getOption, isDestroyable, isFunction } from '@viewjs/utils';
import { Constructor } from '@viewjs/types';
import { Binding, BindingFactory, bindings } from './binding';

export interface IBindableView {
    bindings: BindingDescription[] | ((view: IView) => BindingDescription[]);
}

export interface BindingDescription {
    prop: string;
    selector: string | HTMLElement;
    binding: string | BindingFactory;
}


export interface BindingViewOptions {
    bindingAttribute?: string;
}

export interface BindingOptions {
    selector: string;
    properties: string[];
    direction: 'dom' | 'model' | 'both';
}

export function withBindings<T extends Constructor<View & IModelController<M>>, M extends IModel>(Base: T): T & Constructor<IBindableView> {
    return class extends Base {
        bindings!: BindingDescription[] | ((view: IView) => BindingDescription[]);

        private _bindings!: Binding[];

        setModel(model: M, trigger = true) {
            if (this.model) this._unbindModelDom();
            return super.setModel(model, trigger);
        }

        delegateEvents(events?: EventsMap) {
            super.delegateEvents(events);
            this._bindModelDom();
        }

        undelegateEvents() {
            this._unbindModelDom();
            return super.undelegateEvents();
        }

        bindElement(name: string): Binding;
        bindElement(options: BindingOptions): this
        bindElement(options: string | BindingOptions): any { }

        private _unbindModelDom() {
            if (!this.el || !this.model || !this._bindings) return;
            this._bindings.forEach(m => {
                m.unbind();
                if (isDestroyable(m))
                    m.destroy();
            });
            this._bindings.length = 0;
        }

        private _bindModelDom() {
            if (!this.el || !this.model) return;

            const binds = ((isFunction(this.bindings) ? this.bindings(this) : this.bindings) || []).concat(this._parse());

            this._bindings = binds.map(m => {
                let el: HTMLElement;
                if (isString(m.selector))
                    el = this.el!.querySelector(m.selector) as HTMLElement;
                else
                    el = m.selector;
                if (!el) throw ReferenceError(`could not find element with selector '${m.selector}' in context`);

                let b = m.binding;
                if (isString(m.binding)) {
                    b = bindings[m.binding]
                }
                if (!b) throw new TypeError(`invalid binding type: ${m.binding}`);
                return (b as BindingFactory)(el, this.model!, m.prop);
            });
        }

        private _parse() {
            let out: BindingDescription[] = []
            const attr = getOption<string>('bindingAttribute', [this, this.options]) || 'bind'
            for (let key in bindings) {
                let a = attr + '-' + key;
                html(this.el!).find(`[${a}]`).forEach(m => {
                    out.push({
                        selector: m,
                        prop: m.getAttribute(a)!,
                        binding: key
                    });
                });
            }
            return out;
        }

    }

}