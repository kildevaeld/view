import { BaseView } from '../base-view';
import { IView } from '../types'
import { normalizeUIString } from '../utils';
import { Constructor, debug as Debug, Invoker } from '@viewjs/utils';
const debug = Debug("withAtachedViews");
export interface IViewAttachable {
    views: ViewMap;
}

export interface ViewMapOptions {
    selector: string;
    view: Constructor<IView>;
    optional: boolean;
    [key: string]: any;
}

export interface ViewMap {
    [key: string]: ViewMapOptions;
}

export function withAttachedViews<T extends Constructor<IView>>(Base: T): Constructor<IViewAttachable> & T {
    return class extends Base {
        views: ViewMap;

        constructor(...args: any[]) {
            super(...args);
            if (this.views)
                this._bindViews(this.views);
        }


        render() {
            super.render();
            this._renderViews(this.views);
            return this;
        }

        destroy() {
            if (this.views) {
                this._unbindViews(this.views);
            }
            return super.destroy();
        }

        private _bindViews(views: ViewMap) {
            let o: ViewMapOptions;
            for (const key in views) {
                o = views[key];
                let view = Invoker.get<IView>(o.view);
                (<any>this)[key] = view;
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

        private _renderViews(views: ViewMap) {
            let el: Element | null, o: ViewMapOptions;
            debug("%s render attached views", this);
            for (const key in views) {
                o = views[key];

                let sel = normalizeUIString(o.selector, (<any>this)._ui || {})

                el = this.el!.querySelector(sel);
                if (!el && !o.optional) throw new ReferenceError(`selector "${sel}" for view ${o.view.name} not found in dom`);

                // No element - return!
                if (!el) return;

                let view: IView = (<any>this)[key];
                if (!view) throw new ReferenceError(`view "${o.view.name}" not mount`);
                debug("%s render atcched view %s", this, view);
                view.el = el;
                view.render();

            }
        }
    }
}