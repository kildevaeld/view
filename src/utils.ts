import { StringMap } from './types';

export interface Call {
    ctx?: any
    handler: (...args: any[]) => void;
}

export function callFunc(fn: Call[], args: any[] = []) {
    let l = fn.length, i = -1, a1 = args[0], a2 = args[1],
        a3 = args[2], a4 = args[3];

    switch (args.length) {
        case 0: while (++i < l) fn[i].handler.call(fn[i].ctx); return;
        case 1: while (++i < l) fn[i].handler.call(fn[i].ctx, a1); return;
        case 2: while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2); return;
        case 3: while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2, a3); return;
        case 4: while (++i < l) fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4); return;
        default: while (++i < l) fn[i].handler.apply(fn[i].ctx, args); return;
    }
}

export function result(obj: any, prop: string, ...args: any[]) {
    if (isFunction(obj[prop])) return obj[prop].apply(obj, args);
    return obj[prop];
}

export function getOption<T>(option: string, objs: any[]): T | undefined {
    for (let i = 0, ii = objs.length; i < ii; i++) {
        if (isObject(objs[i]) && objs[i][option]) return objs[i][option];
    }

    return undefined;
}


/**
 * Trigger an event on an object, if it's an eventemitter,
 * will also call an method "on<EventName>" if it's exists
 * 
 * @export
 * @template T 
 * @param {T} self 
 * @param {string} eventName 
 * @param {...any[]} args 
 */
export function triggerMethodOn<T extends any>(self: T, eventName: string, ...args: any[]) {
    const ev = camelcase("on-" + eventName.replace(':', '-'))

    if ((<any>self)[ev] && typeof (<any>self)[ev] === 'function') {
        callFunc([{
            handler: (<any>self)[ev],
            ctx: self
        } as any], args);
    }

    if (isFunction((<any>self).trigger)) {
        args = [eventName].concat(args)
        callFunc([{
            handler: (<any>self).trigger,
            ctx: self
        } as any], args);
    }

}

export function isObject(obj: any): obj is Object {
    return obj === Object(obj);
}

export function isFunction(a: any): a is Function {
    return typeof a === 'function';
}

export function isString(a: any): a is string {
    return typeof a === 'string';
}

export function isElement(a: any): a is Element {
    return a instanceof Element;
}

export function extend<T extends Object, U extends Object>(obj: T, ...args: U[]): T & U {
    if (!isObject(obj)) return obj

    for (let i = 0, ii = args.length; i < ii; i++) {
        const o = args[i];
        if (!isObject(o)) continue
        for (const k in o) {
            if (has(o, k)) (<any>obj)[k] = o[k] as any
        }
    }
    return obj as T & U;
}

const _has = Object.prototype.hasOwnProperty;
export function has(obj: Object, prop: string): boolean {
    return _has.call(obj, prop)
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

export function indexOf<T>(array: ArrayLike<T>, item: T): number {
    for (var i = 0, len = array.length; i < len; i++) if (array[i] === item) return i;
    return -1;
}


// Because IE/edge stinks!
const ElementProto: any = (typeof Element !== 'undefined' && Element.prototype) || {};

const matchesSelector = ElementProto.matches ||
    ElementProto.webkitMatchesSelector ||
    ElementProto.mozMatchesSelector ||
    ElementProto.msMatchesSelector ||
    ElementProto.oMatchesSelector || function (this: Element, selector: string) {
        var nodeList = ((this.parentNode || document) as Element).querySelectorAll(selector) || [];
        return !!~indexOf(nodeList, this);
    };


export function matches(elm: Element, selector: string): boolean {
    return matchesSelector.call(elm, selector)
}

const kUIRegExp = /@(?:ui\.)?([a-zA-Z_\-\$#\d]+)/i;

export function normalizeUIKeys(obj: any, uimap: StringMap): StringMap {
    let o: { [key: string]: any } = {}, k, v;
    for (k in obj) {
        v = obj[k];
        k = normalizeUIString(k, uimap);
        o[k] = v;
    }
    return o;
}

export function normalizeUIString(str: string, uimap: StringMap): string {
    let ms, ui, sel;
    if ((ms = kUIRegExp.exec(str)) != null) {
        ui = ms[1], sel = uimap[ui];
        if (sel != null) str = str.replace(ms[0], sel);
    }
    return str
}