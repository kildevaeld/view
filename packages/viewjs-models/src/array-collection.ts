import { ICollection, ModelEvents, MetaKeys, Options } from './types';
import { EventEmitter } from '@viewjs/events';
import { isString, isObject, isFunction, isDestroyable, inject } from '@viewjs/utils';
import { isModel } from './model';



function getValue(a: any, prop: string) {
    if (isModel(a))
        return a.get(prop);
    else if (isObject(a)) {
        return (a as any)[prop];
    }
    return void 0;
}

function sort(a: any, b: any, prop: string) {
    let av = getValue(a, prop),
        bv = getValue(b, prop);
    if (isString(av)) av = av.toUpperCase();
    if (isString(bv)) bv = bv.toUpperCase();
    if (av < bv)
        return -1;
    else if (av > bv)
        return 1;
    else
        return 0;
}



export interface ArrayCollectionResetOptions extends Options {
    destroy?: boolean;
}

export interface ArrayCollectionPushOptions extends Options { }

export interface ArrayCollectionPopOptions extends Options { }

@inject([])
export class ArrayCollection<T> extends EventEmitter implements ICollection<T> {
    constructor(array: Array<T> = []) {
        super();

        Object.defineProperty(this, MetaKeys.Models, {
            value: array,
            enumerable: false,
            configurable: false,
            writable: true
        });

        //this[MetaKeys.Models] = array;
    }

    private [MetaKeys.Models]: T[]

    /**
     * The length of the array
     *
     * @readonly
     * @type {number}
     * @memberof ArrayCollection
     */
    get length(): number {
        return this[MetaKeys.Models].length;
    }

    /**
     * Get item at index
     *
     * @param {number} index
     * @returns {(T | undefined)}
     *
     * @memberof ArrayCollection
     */
    item(index: number): T | undefined {
        return this[MetaKeys.Models][index];
    }

    /**
     * Push an item and optionally trigger a change event
     *
     * @param {T} m
     * @param {boolean} [trigger=true]
     *
     * @memberof ArrayCollection
     */
    push(m: T, options: ArrayCollectionPushOptions = {}): number {
        this[MetaKeys.Models].push(m);
        this.didAddItem(m, this.length - 1);
        if (!options.silent)
            this.trigger(ModelEvents.Add, m, this[MetaKeys.Models].length - 1);

        return this.length;
    }

    /**
     * Pop a item from the array and optinally trigger a change event
     *
     * @param {boolean} [trigger=true]
     * @returns {(T | undefined)}
     *
     * @memberof ArrayCollection
     */
    pop(options: ArrayCollectionPopOptions = {}): T | undefined {
        let m = this[MetaKeys.Models].pop()
        if (m)
            this.didRemoveItem(m, this.length);
        if (!options.silent && m)
            this.trigger(ModelEvents.Remove, m, this[MetaKeys.Models].length);
        return m;
    }


    insert(m: T, index: number, options: ArrayCollectionPushOptions = {}) {
        if (index >= this.length) return;
        this[MetaKeys.Models].splice(index, 0, m);
        this.didAddItem(m, index);
        if (!options.silent)
            this.trigger(ModelEvents.Add, m, index);
    }

    indexOf(m: T) {
        for (let i = 0, ii = this.length; i < ii; i++) {
            if (this[MetaKeys.Models][i] === m) return i;
        }
        return -1;
    }

    removeAtIndex(index: number, options: ArrayCollectionPopOptions = {}): T | undefined {
        let m = this.item(index);
        if (!m) return undefined;
        if (!options.silent)
            this.trigger(ModelEvents.BeforeRemove, m, index);
        this[MetaKeys.Models].splice(index, 1);
        this.didRemoveItem(m, index);
        if (!options.silent)
            this.trigger(ModelEvents.Remove, m, index);
        return m;
    }

    remove(model: T, options: ArrayCollectionPopOptions = {}): T | undefined {
        let i = -1
        if (!~(i = this.indexOf(model))) {
            return void 0;
        };
        return this.removeAtIndex(i, options);
    }

    find(fn: (model: T, index: number, obj: T[]) => boolean): T | undefined {
        return this[MetaKeys.Models].find(fn);
    }

    findIndex(fn: (model: T, index: number, obj: T[]) => boolean): number {
        return this[MetaKeys.Models].findIndex(fn);
    }

    sort(byComparatorOrProperty?: ((a: T, b: T) => number) | string): this {
        this.trigger(ModelEvents.BeforeSort);
        if (isString(byComparatorOrProperty)) {
            const prop = byComparatorOrProperty;
            byComparatorOrProperty = (a, b) => sort(a, b, prop)
        }

        this[MetaKeys.Models].sort(byComparatorOrProperty);

        this.trigger(ModelEvents.Sort);

        return this;
    }

    /**
     * Reset the array
     *
     * @param {T[]} [a]
     *
     * @memberof ArrayCollection
     */
    reset(a?: T[], options: ArrayCollectionResetOptions = {}): this {
        if (!options.silent)
            this.trigger(ModelEvents.BeforeReset, this[MetaKeys.Models]);

        let old = this[MetaKeys.Models];
        this[MetaKeys.Models] = a || [];
        old.forEach((m, i) => this.didRemoveItem(m, i));
        this[MetaKeys.Models].forEach((m, i) => this.didAddItem(m, i))

        if (!options.silent)
            this.trigger(ModelEvents.Reset, old, this[MetaKeys.Models]);

        return this;
    }

    filter(fn: (a: T) => boolean): this {
        return Reflect.construct(this.constructor, [this[MetaKeys.Models].filter(fn)]);
    }

    map<U>(fn: (a: T, idx: number) => U): ArrayCollection<U> {
        return new ArrayCollection(this[MetaKeys.Models].map(fn));
    }

    forEach(fn: (a: T, idx: number) => any) {
        this[MetaKeys.Models].forEach(fn);
        return this;
    }

    destroy() {
        for (let i = 0, ii = this[MetaKeys.Models].length; i < ii; i++) {
            if (isDestroyable(this[MetaKeys.Models][i])) (<any>this[MetaKeys.Models][i]).destroy();
        }
        this[MetaKeys.Models] = [];
        return this;
    }

    toJSON() {
        return this[MetaKeys.Models].map(m => isFunction((m as any).toJSON) ? (m as any).toJSON() : m);
    }

    // Iterator interface
    [Symbol.iterator]() {
        let pointer = 0;
        let components = this[MetaKeys.Models];
        let len = components.length;
        return {
            next() {
                let done = pointer >= len;
                return {
                    done: done,
                    value: done ? null : components[pointer++]
                };
            }
        };
    }

    protected didAddItem(_model: T, _index: number) { }

    protected didRemoveItem(_model: T, _index: number) { }


}