import { IView } from '@viewjs/view';
import { IAttachmentContainer, AttachOptions } from './types';
import { isFunction, isSubscribable, isPromise, Subscribable, Subscription, Condition, Destroyable } from '@viewjs/utils';
import { Resolver } from './resolver';
import { EventEmitter } from '@viewjs/events';

export class ViewContainer extends EventEmitter implements IAttachmentContainer, Destroyable {

    private _subscription: Subscription | undefined;
    private _shouldRender: boolean = true;
    private _view: IView | undefined;
    private _resolver: Resolver<IView> | undefined;
    private _condition: Condition<IView> | undefined;


    set condition(condition: Condition<IView> | undefined) {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = void 0;
        this._condition = condition;
        if (typeof this._condition != 'undefined') {
            this._shouldRender = false;
            setTimeout(() => {
                this._initializeCondition(this._condition!)
            });

        }

    }

    get condition() {
        return this._condition;
    }

    constructor(public parent: IView, public options: AttachOptions) {
        super();
        if (options.condition)
            this.condition = options.condition;
    }

    getInstance<T extends IView>(): T {
        return this._view as T;
    }

    render() {

        if (!this._shouldRender) return this;

        let el = this.parent.el!.querySelector(this.options.selector)


        if (!el && !this.options.optional) {
            throw new ReferenceError(`element with selector '${this.options.selector}' not found in the dom`);
        } else if (!el) {
            return this;
        }

        if (this._view && this._view.el === el) return this;

        if (!this._view) {
            this._resolveView().then(() => this.render())
            return this;
        }

        if (this._view.el && this._view.el !== el) {
            el!.appendChild(this._view.el);
        } else {
            this._view!.el = el!;
        }

        this._view.render();
        this.trigger('render', this.options.name, this._view);

        return this;

    }

    unmount() {
        if (!this._view || !this._view.el) return this;
        this.trigger('unmount', this.options.name, this._view);
        this._view.destroy()
        this._view = void 0;

        //this._view.el = void 0;
        return this;
    }

    destroy() {
        if (this._subscription)
            this._subscription.unsubscribe();
        this.unmount();
        this._subscription = void 0;
        return this;
    }

    private _initializeCondition(condition: Condition<IView>) {

        let result: Subscribable<boolean> | undefined | boolean | PromiseLike<boolean>;


        if (isFunction(condition)) {
            result = condition(this.parent);
        } else if (isSubscribable(condition)) {
            result = condition;
        } else if (typeof condition === 'boolean') {
            result = condition;
        } else {
            throw TypeError("invalid condition variable " + condition);
        }
        if (isSubscribable(result)) {
            this._shouldRender = false;
            this._subscription = result.subscribe(render => {
                this._shouldRender = render === null ? true : render;
                if (render) {
                    this.render();
                } else {
                    this.unmount();
                }
            })
        } else if (isPromise(result)) {
            result.then(ret => {
                this._shouldRender = ret;
                if (ret) this.render()
                else this.unmount()
            })
        } else {
            this._shouldRender = !!result;
        }
    }

    private _resolveView() {
        if (!this._resolver)
            this._resolver = new Resolver(this.options.view);

        return this._resolver!.resolve()
            .then(view => {
                this._view = view;
                this.trigger('attach', this.options.name, view);
                return view;
            });
    }
}