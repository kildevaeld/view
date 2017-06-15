import { BaseView, BaseViewConstructor, EventsMap, normalizeUIString } from './base-view';
import { IView, Constructor, IEventEmitter, EventHandler } from './types';
import { triggerMethodOn, uniqueId } from './utils';
import { isEventEmitter } from './event-emitter';
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

export function ViewMountable<T extends Constructor<IView>>(Base: T): Constructor<IViewMountable> & T {
    return class extends Base {
        _views: ViewMap
        constructor(...args: any[]) {
            super(...args);
            if (this._views)
                this._bindViews(this._views);
        }



        render() {
            super.render();
            this._renderViews(this._views);
            return this;
        }

        destroy() {
            if (this._views) {
                this._unbindViews(this._views);
            }
            super.destroy();
        }

        private _bindViews(views: ViewMap) {
            let o: ViewMapOptions<any, any>;
            for (const key in views) {
                o = views[key];
                let view = ViewMountable.Invoker.get<BaseView<Element>>(o.view);
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
            let el: Element | null, o: ViewMapOptions<any, any>;
            for (const key in views) {
                o = views[key];

                let sel = normalizeUIString(o.selector, (<any>this)._ui || {})

                el = this.el!.querySelector(sel);
                if (!el) throw new Error(`No selector ${sel} in dom`);

                let view: BaseView<Element> = (<any>this)[key];
                if (!view) throw new Error('view not mounted');
                view.setElement(el, false);
                view.render();
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

export interface IEventListener {
    listenTo(obj: IEventEmitter, event: string, fn: EventHandler, ctx?: any): any;
    listenToOnce(obj: IEventEmitter, event: string, fn: EventHandler, ctx?: any): any;
    stopListening(obj?: IEventEmitter, event?: string, fn?: EventHandler): any;
}

export function EventListener<T extends Constructor<{}>>(Base: T): Constructor<IEventListener> & T {
    return class extends Base {
        _listeningTo: { [key: string]: any }
        listenTo(obj: IEventEmitter, event: string, fn: EventHandler, ctx?: any, once: boolean = false) {
            if (!isEventEmitter(obj)) {
                //if (EventEmitter.throwOnError)
                //    throw new EventEmitterError("obj is not an EventEmitter", once ? "listenToOnce" : "listenTo", this, obj);
                return this;
            }

            let listeningTo, id, meth;
            listeningTo = this._listeningTo || (this._listeningTo = {});
            id = obj.listenId || (obj.listenId = uniqueId())
            listeningTo[id] = obj;
            meth = once ? 'once' : 'on';

            (<any>obj)[meth](event, fn, ctx || this);

            return this;
        }


        listenToOnce(obj: IEventEmitter, event: string, fn: EventHandler, ctx?: any) {
            return this.listenTo(obj, event, fn, ctx, true)
        }


        stopListening(obj?: IEventEmitter, event?: string, callback?: EventHandler) {
            if (obj && !isEventEmitter(obj)) {
                //if (EventEmitter.throwOnError)
                //    throw new EventEmitterError("obj is not an EventEmitter", "stopListening", this, obj);
                return this;
            }

            let listeningTo: any = this._listeningTo;
            if (!listeningTo) return this;
            var remove = !event && !callback;
            if (!callback && typeof event === 'object') callback = <any>this;
            if (obj) (<any>(listeningTo = {}))[obj.listenId!] = obj;

            for (var id in listeningTo) {
                obj = listeningTo[id];
                obj!.off(event, callback, this);

                if (remove || !Object.keys((<any>obj).listeners).length) delete this._listeningTo[id];
            }
            return this;
        }

        destroy() {
            if (typeof Base.prototype.destroy === 'function')
                Base.prototype.destroy.call(this);
            this.stopListening();
        }
    }
}