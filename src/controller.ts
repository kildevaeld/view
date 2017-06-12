import { BaseView, BaseViewConstructor } from './view';
import { EventEmitter } from './event-emitter';
import { triggerMethodOn } from './utils'
import { container } from './container';
import { transient } from 'slick-di';

export const Views = Symbol.for('Views');

export namespace Events {
    export const BeforeSetElement = "before:set:element";
    export const SetElement = "set:element";
    export const BeforeRender = "before:render";
    export const Render = "render";
}



export interface ViewOptions<T extends BaseView<U>, U extends Element> {
    selector: string;
    view: BaseViewConstructor<T, U>
    [key: string]: any;
}

//type ViewMap = { [key: string]: ViewOptions<any, any> };
interface ViewMap {
    [key: string]: ViewOptions<any, any>;
}

export class Controller<T extends Element> extends EventEmitter {
    private _views: ViewMap;
    private _el: T;


    get el(): T {
        return this._el;
    }

    set el(el: T) {
        this.setElement(el);
    }

    render() {
        if (!this.el || !this._views) return;
        triggerMethodOn(this, Events.BeforeRender);
        this._unbindViews(this._views);
        this._bindViews(this._views)
        triggerMethodOn(this, Events.Render);
        return this;
    }

    destroy() {
        if (this._views) {
            this._unbindViews(this._views);
        }
        this.off();
    }

    setElement(el: T, trigger: boolean = false) {
        if (this._el == el) {
            return this;
        }

        if (this._el && this._views) this._unbindViews(this._views);

        triggerMethodOn(this, Events.BeforeSetElement, this._el, el);
        this._el = el;
        triggerMethodOn(this, Events.SetElement, this._el, el);
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

export function view(selector: string): PropertyDecorator {
    return function <T extends Controller<any>>(target: T, prop: PropertyKey) {
        let View = Reflect.getOwnMetadata("design:type", target, prop as string);
        if (!View) throw new Error('design:type does not exists');
        if (!(<any>target)._views) (<any>target)._views = {};
        transient(View);
        (<any>target)._views[prop as string] = {
            selector: selector,
            view: view
        };
    }
}