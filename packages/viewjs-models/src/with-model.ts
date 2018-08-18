import { isString, isFunction, Base } from '@viewjs/utils';
import { IModel } from './types';
import { Model } from './model';
import { isEventEmitter } from '@viewjs/events'
import { Constructor } from '@viewjs/types';


export interface IModelController<M extends IModel> {
    model?: M;
    setModel(model?: M, trigger?: boolean): this;
    modelEvents?: ModelEventsMap;
}

export type ModelEventsMap = {
    [key: string]: (string | ((...args: any[]) => any))[];
}

export function withModel<T extends Constructor<Base>, M extends IModel>(Base: T, TModel?: Constructor<M>): T & Constructor<IModelController<M>> {
    return class extends Base {
        Model = TModel || Model as any;
        private _model: M | undefined = new Model() as any;
        private _modelEvents: ModelEventsMap | undefined;

        get modelEvents() {
            return Object.assign({}, this._modelEvents || {});
        }

        set modelEvents(events: ModelEventsMap) {
            if (this._modelEvents && this.model)
                this._undelegateModelEvents(this.model);
            this._modelEvents = Object.assign({}, events);
            if (this._modelEvents && this.model)
                this._delegateModelEvents(this.model);
        }


        set model(model: M | undefined) {
            this.setModel(model);
        }

        get model(): M | undefined {
            return this._model;
        }


        setModel(model?: M, trigger = true) {
            // if (trigger)
            //     //triggerMethodOn(this, 'before:set:model');
            if (this._model) {
                this._undelegateModelEvents(this._model)
            }
            this._model = model;

            if (model)
                this._delegateModelEvents(model);
            // if (trigger)
            //     triggerMethodOn(this, 'set:model');
            return this;
        }

        private _undelegateModelEvents(model: M) {

            if (!this.modelEvents || !model || !isEventEmitter(model)) {
                return;
            }
            for (let key in this.modelEvents) {

                this.modelEvents[key].forEach(m => {
                    if (isString(m)) {
                        if (isFunction((this as any)[m])) {
                            m = (this as any)[m];
                        } else {
                            throw new Error('not a function');
                        }
                    }
                    model!.off(key, m as any, this);
                });

            }
        }

        private _delegateModelEvents(model: M) {
            if (!this.modelEvents || !model || !isEventEmitter(model)) {
                return;
            }

            for (let key in this.modelEvents) {
                this.modelEvents[key].forEach(m => {
                    if (isString(m)) {
                        if (isFunction((this as any)[m])) {
                            m = (this as any)[m];
                        } else {
                            throw new Error('not a function');
                        }
                    }
                    model!.on(key, m as any, this);
                });
            }
        }

        destroy() {
            if (this.model)
                this._undelegateModelEvents(this.model);
            if (Base.prototype.destroy)
                Base.prototype.destroy.call(this);

            return this;
        }

    }

}