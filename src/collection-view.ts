import { BaseView, BaseViewOptions } from './base-view';
import { View } from './view';
import { Constructor } from './types';
import { ViewMountable } from './mixins';
import { EventEmitter } from './event-emitter';
export interface ICollection<T> {
    length: number;
    item(index: number): T | undefined;
    //indexOf(item: T): number;
}

export class ArrayCollection<T> extends EventEmitter implements ICollection<T> {

    constructor(private a: Array<T> = []) {
        super();
    }
    get length(): number {
        return this.a.length;
    }

    item(index: number): T | undefined {
        if (index >= this.a.length) return undefined;

        return this.a[index];
    }

    push(m: T) {
        this.a.push(m);
        this.trigger(ModelEvents.Add, m, this.a.length - 1);
    }

    pop(): T | undefined {
        let m = this.a.pop()
        this.trigger(ModelEvents.Remove, m, this.a.length);
        return m;
    }

    insert(m: T, index: number) {
        if (index >= this.length) return;
        this.a.splice(index, 0, m);
        this.trigger(ModelEvents.Add, m, index);
    }

    indexOf(m: T) {
        return this.a.indexOf(m);
    }

    remove(index: number): T | undefined {
        let m = this.item(index);
        if (!m) return undefined;
        this.a.splice(index, 1);
        this.trigger(ModelEvents.Remove, m, index);
        return m;
    }

    find(fn: (m: T) => boolean) {
        return this.a.find(fn);
    }

    clear() {
        this.a = [];
        this.trigger(ModelEvents.Clear);
    }

    array() { return this.a }
}

export namespace ModelEvents {
    export const Add = "add";
    export const Remove = "remove";
    export const Clear = "clear";
}

export interface BaseCollectionViewOptions<T extends Element, U extends View> extends BaseViewOptions<T> {
    childViewContainer?: string;
    childView?: Constructor<U>
}

export class BaseCollectionView<T extends Element, U extends ICollection<M>, M, V extends View> extends BaseView<T> {

    private _collection?: U;
    private _childViews: V[];
    readonly options: BaseCollectionViewOptions<T, V>;

    childView?: Constructor<V>
    childViewContainer?: string;

    set collection(collection: U | undefined) {
        if (this._collection == collection) return;
        if (this.collection) {
            this._removeModelEvents();
            this._removeChildViews();
        }

        this._collection = collection;

        if (this.collection) {
            this._addModelEvents();
        }

        this.render();

    }

    get collection(): U | undefined {
        return this._collection;
    }

    render() {
        this.undelegateEvents();

        this._removeChildViews();

        if (!this.el || !this.collection) return this;

        this._renderCollection();

        this.delegateEvents();

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
            let view = this._createChildView(item);
            this._renderChildView(view);
            this._attachChildView(frag, view, i);
        }

        container.appendChild(frag);
    }



    protected _renderChildView(view: V) {
        view.render();
    }

    protected _attachChildView(container: Node, view: V, index: number) {
        if (index >= this._childViews.length) {
            container.appendChild(view.el!);
            this._childViews.push(view);
        } else {
            let after = this._childViews[index];
            this._childViews.splice(index, 0, view);
            container.insertBefore(view.el!, after.el!);
        }

    }


    protected _createChildView(model: M): V {
        let Vi: Constructor<V> = this.options.childView || this.childView || (View as any);

        let el = ViewMountable.Invoker.get(Vi);
        (<any>el).data = model;
        if (!el.options.ensureElement)
            el.options.ensureElement = 'div';
        el.options.attachId = true;

        return el;

    }

    protected _destroyChildView(view: V) {
        let index = this._childViews.indexOf(view);
        this._childViews.splice(index, 1);
        let container = this._getChildViewContainer();
        container.removeChild(view.el!);
        view.destroy();
    }

    private _modelAdded(item: M, index: number) {
        let view = this._createChildView(item);
        this._renderChildView(view);
        this._attachChildView(this._getChildViewContainer(), view, index);
    }

    private _modelRemoved(_: M, index: number) {
        let view = this._childViews[index];
        this._destroyChildView(view);
    }

    protected _addModelEvents() {
        if (this.collection instanceof EventEmitter) {
            this.collection.on(ModelEvents.Add, this._modelAdded, this);
            this.collection.on(ModelEvents.Remove, this._modelRemoved, this);
            this.collection.on(ModelEvents.Clear, this._removeChildViews, this);
        }
    }

    protected _removeModelEvents() {
        if (this.collection instanceof EventEmitter) {
            this.collection.off(null, undefined, this);
        }
    }

    private _getChildViewContainer() {
        let sel = this.options.childViewContainer || this.childViewContainer
        if (!sel) return this.el!;
        let el = this.el!.querySelector(sel);
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