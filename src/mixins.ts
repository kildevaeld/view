import { BaseView, BaseViewConstructor, EventsMap } from './base-view';
import { IView, Constructor } from './types';
import { triggerMethodOn } from './utils';
//import { transient } from 'slick-di';

//import { container } from './container';

export interface ViewMapOptions<T extends BaseView<U>, U extends Element> {
    selector: string;
    view: BaseViewConstructor<T, U>
    [key: string]: any;
}

export interface ViewMap {
    [key: string]: ViewMapOptions<any, any>;
}

export interface IViewMountable {
    _views: ViewMap;
}

export function ViewMountable<T extends Constructor<IView>>(Base: T): T {
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
            let el: Element | null, o: ViewMapOptions<any, any>;
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

export namespace Events {
    export const BeforeRender = "before:render";
    export const Render = "render";
    export const BeforeSetElement = "before:set:element";
    export const SetElement = "set:element";
    export const BeforeDelegateEvents = "before:delegate:events";
    export const DelegateEvents = "delegate:events";
    export const BeforeUndelegateEvents = "before:undelegate:events";
    export const UndelegateEvents = "undelegate:events";
    export const BeforeDestroy = "before:destroy";
    export const Destroy = "destroy";

}

export function ViewObservable<T extends Constructor<BaseView<U>>, U extends Element>(Base: T): T {
    return class extends Base {

        render() {
            triggerMethodOn(this, Events.BeforeRender);
            super.render();
            triggerMethodOn(this, Events.Render);
            return this;
        }

        setElement(el: U | undefined, trigger?: boolean) {
            triggerMethodOn(this, Events.BeforeSetElement);
            super.setElement(el, trigger);
            triggerMethodOn(this, Events.SetElement);
            return this;
        }

        delegateEvents(events?: EventsMap) {
            triggerMethodOn(this, Events.BeforeDelegateEvents);
            super.delegateEvents(events)
            triggerMethodOn(this, Events.DelegateEvents);
            return this;
        }

        undelegateEvents() {
            triggerMethodOn(this, Events.BeforeUndelegateEvents);
            super.undelegateEvents();
            triggerMethodOn(this, Events.UndelegateEvents);
            return this;
        }

        destroy() {
            triggerMethodOn(this, Events.BeforeDestroy);
            const off = this.off;
            this.off = () => { }
            super.destroy();
            this.off = off;
            triggerMethodOn(this, Events.Destroy);
            this.off();
        }

    }
}
