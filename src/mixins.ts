import { BaseView, BaseViewConstructor } from './view';
import { IView } from './types';
import { container } from './container';
export type Constructor<T> = new (...args: any[]) => T;

export interface ViewOptions<T extends BaseView<U>, U extends Element> {
    selector: string;
    view: BaseViewConstructor<T, U>
    [key: string]: any;
}

interface ViewMap {
    [key: string]: ViewOptions<any, any>;
}

export function ViewMountable<T extends Constructor<IView>>(Base: T) {
    return class extends Base {
        private _views: ViewMap
        constructor(...args: any[]) {
            super(...args);
        }

        render() {
            if (!this.el || !this._views) return this;

            this._unbindViews(this._views);
            super.render();
            this._bindViews(this._views)

            return this;
        }

        destroy() {
            if (this._views) {
                this._unbindViews(this._views);
            }
            super.destroy();
        }

        private _bindViews(views: ViewMap) {
            let el: Element | null, o: ViewOptions<any, any>;
            for (const key in views) {
                o = views[key];
                el = this.el.querySelector(o.selector);
                if (!el) throw new Error(`No selector ${o.selector} in dom`);

                //let view = new o.view();
                let view = container().get<BaseView<Element>>(o.view);
                view.setElement(el, false);
                (<any>this)[key] = view.render();
            }
        }

        private _unbindViews(views: ViewMap) {
            const self = this as any;
            for (const key in views) {
                if (self[key] && self[key] instanceof BaseView) {
                    self[key].destroy();
                    self[key] = void 0;
                }
            }
        }
    }
}