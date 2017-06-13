import { BaseView, BaseViewOptions } from './base-view';
import { View, ViewOptions } from './view';
import { EventEmitter } from './event-emitter';
import { IView, Constructor } from './types';
import { extend } from './utils';

export interface ICollection<T> {
    length: number;
    item(index: number): T | undefined;
    //indexOf(item: T): number;
}

export function ArrayCollection<T>(a: ArrayLike<T>): ICollection<T> {
    return new class {
        constructor(private a: ArrayLike<T>) { }
        get length(): number {
            return this.a.length;
        }

        item(index: number): T | undefined {
            if (index >= this.a.length) return undefined;
            return this.a[index];
        }
    }(a);
}

export interface BaseCollectionViewOptions<T extends Element, U extends View> extends BaseViewOptions<T> {
    childViewContainer?: string;
    childView?: Constructor<U>
    childViewOptions?: ViewOptions;
}

export class BaseCollectionView<T extends Element, U extends ICollection<M>, M, V extends View> extends BaseView<T> {

    private _collection?: U;
    private _childViews: V[];
    readonly options: BaseCollectionViewOptions<T, V>;
    childView: Constructor<V>
    set collection(collection: U | undefined) {
        if (this._collection == collection) return;
        this._collection = collection;
    }

    get collection(): U | undefined {
        return this._collection;
    }

    render() {
        this.undelegateEvents();

        this._removeChildViews();

        if (!this.el || !this.collection) return this;

        this._renderCollection();

        return this;
    }

    protected _removeChildViews() {
        if (!this._childViews) {
            this._childViews = [];
        }
        for (let v of this._childViews) {
            v.destroy()
            v.el!.remove();
        }

        this._childViews = [];
    }

    protected _renderCollection(collection?: U) {
        let col = collection || this.collection;

        let container = this._getChildViewContainer();

        container.innerHTML = '';

        const frag = document.createDocumentFragment();

        for (let i = 0, ii = col!.length; i < ii; i++) {
            let item = col!.item(i);
            if (!item) throw TypeError("invalid index");
            let el = this._createChildView(item);
            frag.appendChild(el.render().el!);
            this._childViews.push(el);
        }

        container.appendChild(frag);
    }

    private _createChildView(model: M): V {
        let V = this.options.childView || this.childView || View;
        let options = extend({}, this.options.childViewOptions || {}, {
            ensureElement: "div"
        });

        let el = new V(options);
        (<any>el).data = model;

        return el;

    }

    private _getChildViewContainer() {
        if (!this.options.childViewContainer) return this.el!;
        let el = this.el!.querySelector(this.options.childViewContainer);
        if (!el) throw new Error(`tag not found: ${this.options.childViewContainer}`);
        return el!;
    }

    destroy() {
        this._removeChildViews();
        super.destroy();
    }

}

export class CollectionView<M, V extends View> extends BaseCollectionView<Element, ICollection<M>, M, V> {

}