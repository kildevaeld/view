import { BaseView, BaseViewConstructor } from './base-view';
import { IView, Constructor } from './types';
//import { transient } from 'slick-di';

//import { container } from './container';

export interface ViewOptions<T extends BaseView<U>, U extends Element> {
    selector: string;
    view: BaseViewConstructor<T, U>
    [key: string]: any;
}

export interface ViewMap {
    [key: string]: ViewOptions<any, any>;
}

export interface IViewMountable {
    _views: ViewMap;
}

export function ViewMountable<T extends Constructor<IView>>(Base: T): Constructor<IViewMountable> & T {
    return class extends Base {
        _views: ViewMap
        constructor(...args: any[]) {
            super(...args);
        }

        render() {
            if (this.el && this._views)
                this._unbindViews(this._views);
            super.render();

            if (this.el && this._views)
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
                el = this.el!.querySelector(o.selector);
                if (!el) throw new Error(`No selector ${o.selector} in dom`);

                let view = ViewMountable.Invoker.get<BaseView<Element>>(o.view);
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

export namespace ViewMountable {

    export interface IInvoker {
        get<T>(key: any): T
    }

    export var Invoker = {
        get<T extends IView>(V: Constructor<T>): T {
            return new V();
        }
    }
}


export function view(selector: string) {
    return function <T extends IViewMountable>(target: T, prop: PropertyKey) {
        let View = Reflect.getOwnMetadata("design:type", target, prop as string);
        if (!View) throw new Error('design:type does not exists');
        if (!target._views) target._views = {};
        //transient(View);
        target._views[prop as string] = {
            selector: selector,
            view: View
        };
    }
}