import { equal, isFunction, isString, isNumber, isPlainObject } from '@viewjs/utils';
import { MetaKeys, IModel, AttributeValueMap } from './types';
import { EventEmitter } from '@viewjs/events';

export function isModel(a: any): a is IModel {
    return a && ((a instanceof Model)
        || (isFunction(a.set)
            && isFunction(a.get)
            && isFunction(a.unset)
            && isFunction(a.clear))
    );
}

export interface ModelSetOptions {
    silent?: boolean;
}
export class Model extends EventEmitter implements IModel {
    static idAttribute = "id";

    [MetaKeys.Attributes]: Map<string | number, any> = new Map();

    get id() {
        return this.get((this.constructor as any).idAttribute || 'id')
    }

    set id(id: any) {
        this.set((this.constructor as any).idAttribute, id);
    }


    constructor(attrs?: any) {
        super();
        if (attrs) {
            for (let k in attrs) {
                this.set(k, attrs[k], { silent: true });
            }
        }
    }


    set<U>(key: string | number | AttributeValueMap, value?: U, options?: ModelSetOptions) {
        let input: AttributeValueMap = {}
        options = options || {};
        if (isString(key) || isNumber(key)) input = { [key]: value };
        else if (isPlainObject(input)) input = key;
        else throw new TypeError('invalid key type ' + typeof key);

        let o: any, v: any, c = false, changed: AttributeValueMap = {};
        for (let k in input) {
            o = this.get(k);
            v = input[k];
            if (equal(o, v)) {
                continue;
            }
            c = true;
            this[MetaKeys.Attributes].set(k, v);
            changed[k] = v;
            if (!options.silent) {
                this.trigger(`change:${k}`, o, v);
            }
        }

        if (c && !options.silent)
            this.trigger('change', changed);

        return this;
    }

    get<U>(key: string | number): U | undefined {
        return this[MetaKeys.Attributes].get(key);
    }

    has(key: string | number): boolean {
        return this[MetaKeys.Attributes].has(key);
    }

    unset<U>(key: string | number): U | undefined {
        if (!this.has(key)) return void 0;
        let t = this.get<U>(key);
        this[MetaKeys.Attributes].delete(key);
        return t;
    }

    clear() {
        this[MetaKeys.Attributes].clear();
        this.trigger('clear');
        return this;
    }

    toJSON() {
        let out: any = {};

        this[MetaKeys.Attributes].forEach((value: any, key: any) => {
            out[key] = value;
        });

        return out;
    }
}