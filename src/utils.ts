
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

export function triggerMethodOn<T extends any>(self: T, eventName: string, ...args: any[]) {
    //var self: any = this;
    let ev = camelcase("on-" + eventName.replace(':', '-'))


    if (self[ev] && typeof self[ev] === 'function') {
        callFunc([{
            handler: self[ev],
            ctx: self
        } as any], args);
    }

    args = [eventName].concat(args)
    callFunc([{
        handler: self.trigger,
        ctx: self
    } as any], args);
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

export function extend<T extends Object, U extends Object>(obj: T, ...args: U[]): T & U {
    if (!isObject(obj)) return obj
    //let o, k
    for (let o of args) {
        if (!isObject(o)) continue
        for (let k in o) {
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

// Bind a function to an object for ever and ever....
export function bind(target: any, property: PropertyKey, descriptor: PropertyDescriptor) {
    let fn = descriptor.value;
    if (!isFunction(fn)) {
        throw new TypeError("Can only bind functions");
    }
    let definingProperty = false;

    return {
        configurable: true,
        get() {
            if (definingProperty || this === target.prototype || this.hasOwnProperty(property)) {
                return fn;
            }

            const boundFn = fn.bind(this);
            definingProperty = true;
            Object.defineProperty(this, property, {
                value: boundFn,
                configurable: true,
                writable: true,
            });
            definingProperty = false;
            return boundFn;
        }
    };
}