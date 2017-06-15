import { BaseView, BaseViewOptions } from './base-view';
import { View } from './view';
import { Constructor, ICollection } from './types';
export interface BaseCollectionViewOptions<T extends Element, U extends View> extends BaseViewOptions<T> {
    childViewContainer?: string;
    eventProxyName?: string;
    childView?: Constructor<U>;
}
export declare class BaseCollectionView<T extends Element, U extends ICollection<M>, M, V extends View> extends BaseView<T> {
    private _collection?;
    private _childViews;
    readonly options: BaseCollectionViewOptions<T, V>;
    childView?: Constructor<V>;
    childViewContainer?: string;
    collection: U | undefined;
    constructor(options?: BaseCollectionViewOptions<T, V>);
    render(): this;
    protected _removeChildViews(): void;
    protected _renderCollection(collection?: U): void;
    protected _renderChildView(view: V): void;
    protected _attachChildView(container: Node, view: V, index: number): void;
    protected _createChildView(model: M): V;
    protected _destroyChildView(view: V): void;
    private _modelAdded(item, index);
    private _modelRemoved(_, index);
    protected _addModelEvents(): void;
    protected _removeModelEvents(): void;
    private _getChildViewContainer();
    private _proxyChildViewEvents(view);
    destroy(): void;
}
export declare class CollectionView<M, V extends View> extends BaseCollectionView<Element, ICollection<M>, M, V> {
}
