import { ArrayCollection, ArrayCollectionPushOptions, ArrayCollectionResetOptions } from './array-collection';
import { ModelConstructor } from './types';
import { Model } from './model';
import { Invoker, isPlainObject, inject } from '@viewjs/utils';

export interface ModelCollectionOptions<M extends Model> {
    Model?: ModelConstructor<M>
}

@inject([])
export class ModelCollection<M extends Model> extends ArrayCollection<M> {
    private _Model: ModelConstructor<M> | undefined;

    get Model(): ModelConstructor<M> {
        if (!this._Model) return Model as any;
        return this._Model;
    }

    set Model(model: ModelConstructor<M>) {
        this._Model = model;
    }

    constructor(models?: M[], options: ModelCollectionOptions<M> = {}) {
        super();

        if (options.Model) {
            this.Model = options.Model
        }

        if (Array.isArray(models)) {
            models.forEach(m => this.push(m));
        }
    }

    protected ensureModel(m: any): M {
        if (!(m instanceof this.Model)) {
            if (!isPlainObject(m)) throw new TypeError("invalid type");
            m = this.createModel(m);
        }
        return m;
    }

    createModel(o?: { [key: string]: any }) {
        const model = Invoker.get(this.Model);
        if (o) {
            model.set(o, void 0, { silent: true });
        }
        return model;
    }

    /**
     * Push a model to the collection
     *
     * @param {(M | any)} m
     * @param {boolean} [trigger=true]
     * @returns {number}
     * @memberof ModelCollection
     */
    push(m: M | any, options: ArrayCollectionPushOptions = {}): number {
        m = this.ensureModel(m);

        const found = this.find(model => model.id == m.id)
        if (found && found !== m) {
            let json = m.toJSON();
            for (let k in json) {
                m.set(k, json[k]);
            }
            return this.length;
        } else if (found === m) return this.length;

        const ret = super.push(m, options);
        return ret;
    }

    reset(a?: M[], options: ArrayCollectionResetOptions = {}) {
        return super.reset((a || []).map(m => this.ensureModel(m)), options);
    }


    insert(m: M | any, index: number, options: ArrayCollectionPushOptions = {}) {
        if (index >= this.length) return;
        m = this.ensureModel(m);
        const found = this.find(model => model.id == m.id)
        if (found && found !== m) {
            let json = m.toJSON();
            for (let k in json) {
                m.set(k, json[k]);
            }
            return;
        } else if (found === m) return;
        super.insert(m, index, options);

    }

}