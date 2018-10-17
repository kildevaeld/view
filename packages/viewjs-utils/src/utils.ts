import { Call, Destroyable, Subscribable, Resolvable } from './types';

export class Base implements Destroyable {
    //static inherit = inherit;
    destroy(): this {
        return this;
    }
}


export function getGlobal() {
    return Function('return this')();
}


export function callFuncCond(fn: Call[], args: any[] = []) {

    let l = fn.length, i = -1, a1 = args[0], a2 = args[1],
        a3 = args[2], a4 = args[3], a5 = args[4];
    switch (args.length) {
        case 0: while (++i < l) (!fn[i].condition || fn[i].condition!.call(fn[i].ctx, args)) && fn[i].handler.call(fn[i].ctx); return;
        case 1: while (++i < l) (!fn[i].condition || fn[i].condition!.call(fn[i].ctx, args)) && fn[i].handler.call(fn[i].ctx, a1); return;
        case 2: while (++i < l) (!fn[i].condition || fn[i].condition!.call(fn[i].ctx, args)) && fn[i].handler.call(fn[i].ctx, a1, a2); return;
        case 3: while (++i < l) (!fn[i].condition || fn[i].condition!.call(fn[i].ctx, args)) && fn[i].handler.call(fn[i].ctx, a1, a2, a3); return;
        case 4: while (++i < l) (!fn[i].condition || fn[i].condition!.call(fn[i].ctx, args)) && fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4); return;
        case 5: while (++i < l) (!fn[i].condition || fn[i].condition!.call(fn[i].ctx, args)) && fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4, a5); return;
        default: while (++i < l) (!fn[i].condition || fn[i].condition!.call(fn[i].ctx, args)) && fn[i].handler.apply(fn[i].ctx, args); return;
    }
}


export function isCall(a: any): a is Call {
    return a && isFunction(a.handler) && (!a.condition || isFunction(a.condition));
}

export function result<T>(obj: any, prop: string, ...args: any[]): T | undefined {
    if (isFunction(obj[prop])) return obj[prop].apply(obj, args);
    return obj[prop];
}

export function getOption<T>(option: string, objs: any[], resolve: boolean = false): T | undefined {
    for (let i = 0, ii = objs.length; i < ii; i++) {
        if (isObjectLike(objs[i]) && objs[i][option]) {
            return resolve ? result(objs[i], option) : objs[i][option];
        }
    }
    return void 0;
}

export function isObjectLike(val: any): val is object {
    return val === Object(val);
}


export function isObject(val: any): val is object {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

function isObjectObject(o: any) {
    return isObject(o) === true
        && Object.prototype.toString.call(o) === '[object Object]';
}

export function isPlainObject(o: any): o is object {
    var ctor: any, prot: any;

    if (isObjectObject(o) === false) return false;

    // If has modified constructor
    ctor = o.constructor;
    if (typeof ctor !== 'function') return false;

    // If has modified prototype
    prot = ctor.prototype;
    if (isObjectObject(prot) === false) return false;

    // If constructor does not have an Object-specific method
    if (prot.hasOwnProperty('isPrototypeOf') === false) {
        return false;
    }

    // Most likely a plain Object
    return true;
}

export function isFunction(a: any): a is Function {
    return typeof a === 'function';
}

export function isNumber(num: any): num is number {
    return typeof num === 'number';
}


export function isDestroyable(a: any): a is Destroyable {
    return a && isFunction(a.destroy);
}

export function isSubscribable<T = any>(a: any): a is Subscribable<T> {
    return isObjectLike(a) && isFunction((a as any).subscribe);
}

export function isString(a: any): a is string {
    return typeof a === 'string';
}

export function isElement(input: any): input is Element {
    if (!input) return false;
    else if (input instanceof Element) return true;
    return (input != null)
        && (typeof input === 'object')
        && (input.nodeType === Node.ELEMENT_NODE)
        && (typeof input.style === 'object')
        && (typeof input.ownerDocument === 'object');
}

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    let out: any = {};
    for (let i = 0, ii = keys.length; i < ii; i++) {
        if (has(obj, keys[i])) out[keys[i]] = obj[keys[i]];
    }

    return out;
}

const _has = Object.prototype.hasOwnProperty,
    _slice = Array.prototype.slice;

export function has(obj: Object, prop: string | number | symbol): boolean {
    return _has.call(obj, prop)
}

export function slice<T>(obj: ArrayLike<T>, start?: number, len?: number): T[] {
    return _slice.call(obj, start, len)
}

export function camelcase(input: string): string {
    return input.toLowerCase().replace(/-(.)/g, function (_, group1) {
        return group1.toUpperCase();
    });
};

var idCounter = 0;
export function uniqueId(prefix: string = "") {
    return prefix + (++idCounter)
}

export function noop() { }

export function destroy(a: any) {
    if (isDestroyable(a)) a.destroy();
}

export function resolve<T>(r: Resolvable<T>, args?: any): PromiseLike<T> {
    const resolved = isFunction(r) ? r(args) : r;
    if (isPromise<T>(resolved)) {
        return resolved;
    }
    return Promise.resolve(resolved);
}

export function isPromise<T>(a: any): a is PromiseLike<T> {
    return a &&
        isObjectLike(a) &&
        isFunction((a as any).then) &&
        isFunction((a as any).catch)
}


export interface Deferred<T> {
    promise: Promise<T>;
    resolve: (r: T | PromiseLike<T> | undefined) => void;
    reject: (e: Error) => void;
}

export function deferred<T>(): Deferred<T> {
    let resolve, reject, promise = new Promise<T>((rs, rj) => {
        resolve = rs;
        reject = rj;
    });

    return { promise, resolve, reject } as any;
}