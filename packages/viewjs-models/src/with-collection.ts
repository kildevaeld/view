
import { ICollection, ModelConstructor } from './types';
import { isFunction, Base as BaseObject, isString } from '@viewjs/utils';
import { isEventEmitter } from '@viewjs/events';
import { ModelCollection } from './model-collection';
import { Constructor } from '@viewjs/types';


export interface ICollectionController<TCollection extends ICollection<TModel>, TModel> {
    collection?: TCollection;
    collectionEvents?: any;
}

export type CollectionEventsMap = {
    [key: string]: (string | ((...args: any[]) => any))[];
}


export function withCollection<
    TBaseType extends Constructor<BaseObject>,
    TCollection extends ICollection<TModel>,
    TModel = any>(Base: TBaseType, CCollection?: Constructor<TCollection>, MModel?: ModelConstructor<TModel>): TBaseType & Constructor<ICollectionController<TCollection, TModel>> {

    return class extends Base {
        Collection: TCollection = CCollection || new ModelCollection as any
        private _collection?: TCollection;
        collectionEvents: CollectionEventsMap = {};

        set collection(collection: TCollection | undefined) {
            this.setCollection(collection);
        }

        get collection(): TCollection | undefined {
            return this._collection;
        }

        constructor(...args: any[]) {
            super(...args);
            this.collection = CCollection ? new CCollection() : void 0;
            if (MModel && this.collection && this.collection instanceof ModelCollection) {
                this.collection.Model = MModel;
            }
        }

        setCollection(collection?: TCollection, trigger = true) {
            if (trigger)
                //triggerMethodOn(this, 'before:set:model');
                if (this._collection) {
                    this._undelegateCollectionEvents(this._collection)
                }
            this._collection = collection;

            if (collection)
                this._delegateCollectionEvents(collection);
            if (trigger)
                //triggerMethodOn(this, 'set:collection');
                return this;
        }

        private _undelegateCollectionEvents(collection?: TCollection) {

            if (!this.collectionEvents || !collection || !isEventEmitter(collection)) {
                return;
            }
            for (let key in this.collectionEvents) {

                this.collectionEvents[key].forEach(m => {
                    if (isString(m)) {
                        if (isFunction((this as any)[m])) {
                            m = (this as any)[m];
                        } else {
                            throw new Error('not a function');
                        }
                    }
                    collection!.off(key, m as any, this);
                });

            }
        }

        private _delegateCollectionEvents(collection?: TCollection) {
            if (!this.collectionEvents || !collection || !isEventEmitter(collection)) {
                return;
            }

            for (let key in this.collectionEvents) {
                this.collectionEvents[key].forEach(m => {
                    if (isString(m)) {
                        if (isFunction((this as any)[m])) {
                            m = (this as any)[m];
                        } else {
                            throw new Error('not a function');
                        }
                    }
                    collection!.on(key, m as any, this);
                });
            }
        }

        destroy() {
            this._undelegateCollectionEvents(this._collection);

            if (Base.prototype.destroy)
                Base.prototype.destroy.call(this);

            return this;
        }


    }
}

