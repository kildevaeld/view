import { IModel, ModelConstructor, ICollection, ModelEvents } from './types';
import { IModelController } from './with-model';
import { has } from '@viewjs/utils';
import { ICollectionController } from './with-collection';

function setter<T extends IModel, U>(_: T, prop: any) {
    return function $observableSetter(this: T, value: U) {
        return this.set(prop, value)
    }
}


function getter<T extends IModel, U>(_: T, prop: any) {
    return function $observableGetter(this: T): U {
        return this.get<U>(prop)!
    }
}

function _event<T extends any>(event: string, property: string | undefined, target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>, targetKey: string) {
    if (!desc) throw new Error('no description');
    if (typeof desc.value !== 'function') {
        throw new TypeError('must be a function');
    }

    const key = event + (property ? ':' + property : '');
    if (target[targetKey] && has(target[targetKey], key)) {
        let old = target[targetKey][key]
        if (!Array.isArray(old)) old = [old];
        old.push(prop as any);
        target[targetKey][key] = old;
    } else {
        target[targetKey] = Object.assign(target[targetKey] || {}, {
            [key]: [prop]
        });

    }
}


/**
     *
     * @export
     * @template
     * @param {T} target
     * @param {*} prop
     * @param {TypedPropertyDescriptor<U>} [descriptor]
     */
export function property<T extends IModel, U>(target: T, prop: any, descriptor?: TypedPropertyDescriptor<U>): any {
    descriptor = descriptor || Object.getOwnPropertyDescriptor(target, prop);
    if (!descriptor) {
        return {
            get: getter<T, U>(target, prop),
            set: setter<T, U>(target, prop),
            enumerable: false,
            configurable: false
        }
    } else if (descriptor.set) {
        descriptor.set = setter<T, U>(target, prop);
        descriptor.get = getter<T, U>(target, prop);
        if (descriptor.value)
            target.set(prop, descriptor.value);
        delete descriptor.value;
    }


}

export function idAttribute(prop: string) {
    return function <T extends ModelConstructor<IModel>>(target: T) {
        target.idAttribute = prop;
    }
}


export namespace model {

    export function event(event: string, property?: string) {
        return function <T extends IModelController<M>, M extends IModel>(target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>) {
            return _event(event, property, target, prop, desc, "modelEvents");
        }
    }

    export function change(property?: string) {
        return event(ModelEvents.Change, property);
    }

}


export function collection(event: string) {
    return function <T extends ICollectionController<C, M>, C extends ICollection<M>, M extends IModel>(target: T, prop: string, desc: TypedPropertyDescriptor<(...args: any[]) => any>) {
        return _event(event, void 0, target, prop, desc, "collectionEvents");
    }
}

export namespace collection {
    export const add = collection(ModelEvents.Add);
    export const remove = collection(ModelEvents.Remove);
}
