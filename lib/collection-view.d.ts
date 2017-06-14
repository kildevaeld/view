import { BaseView, BaseViewOptions } from './base-view';
import { View } from './view';
import { Constructor } from './types';
export interface ICollection<T> {
    length: number;
    item(index: number): T | undefined;
}
export declare function ArrayCollection<T>(a: ArrayLike<T>): ICollection<T>;
export interface BaseCollectionViewOptions<T extends Element, U extends View> extends BaseViewOptions<T> {
    childViewContainer?: string;
    childView?: Constructor<U>;
}
export declare class BaseCollectionView<T extends Element, U extends ICollection<M>, M, V extends View> extends BaseView<T> {
    private _collection?;
    private _childViews;
    readonly options: BaseCollectionViewOptions<T, V>;
    childView: Constructor<V>;
    collection: U | undefined;
    render(): this;
    protected _removeChildViews(): void;
    protected _renderCollection(collection?: U): void;
    private _createChildView(model);
    private _getChildViewContainer();
    destroy(): void;
}
export declare class CollectionView<M, V extends View> extends BaseCollectionView<Element, ICollection<M>, M, V> {
}
