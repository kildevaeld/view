"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function callFunc(fn, args = []) {
    let l = fn.length, i = -1, a1 = args[0], a2 = args[1], a3 = args[2], a4 = args[3];
    switch (args.length) {
        case 0:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx);
            return;
        case 1:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx, a1);
            return;
        case 2:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx, a1, a2);
            return;
        case 3:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx, a1, a2, a3);
            return;
        case 4:
            while (++i < l)
                fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4);
            return;
        default:
            while (++i < l)
                fn[i].handler.apply(fn[i].ctx, args);
            return;
    }
}
exports.callFunc = callFunc;
function result(obj, prop, ...args) {
    if (isFunction(obj[prop]))
        return obj[prop].apply(obj, args);
    return obj[prop];
}
exports.result = result;
function getOption(option, objs) {
    /*for (let o of objs) {
        if (isObject(o) && o[option]) return o[option]
    }*/
    for (let i = 0, ii = objs.length; i < ii; i++) {
        if (isObject(objs[i]) && objs[i][option])
            return objs[i][option];
    }
    return undefined;
}
exports.getOption = getOption;
function triggerMethodOn(self, eventName, ...args) {
    const ev = camelcase("on-" + eventName.replace(':', '-'));
    if (self[ev] && typeof self[ev] === 'function') {
        callFunc([{
                handler: self[ev],
                ctx: self
            }], args);
    }
    if (isFunction(self.trigger)) {
        args = [eventName].concat(args);
        callFunc([{
                handler: self.trigger,
                ctx: self
            }], args);
    }
}
exports.triggerMethodOn = triggerMethodOn;
function isObject(obj) {
    return obj === Object(obj);
}
exports.isObject = isObject;
function isFunction(a) {
    return typeof a === 'function';
}
exports.isFunction = isFunction;
function isString(a) {
    return typeof a === 'string';
}
exports.isString = isString;
function extend(obj, ...args) {
    if (!isObject(obj))
        return obj;
    for (let i = 0, ii = args.length; i < ii; i++) {
        const o = args[i];
        if (!isObject(o))
            continue;
        for (const k in o) {
            if (has(o, k))
                obj[k] = o[k];
        }
    }
    return obj;
}
exports.extend = extend;
const _has = Object.prototype.hasOwnProperty;
function has(obj, prop) {
    return _has.call(obj, prop);
}
exports.has = has;
function camelcase(input) {
    return input.toLowerCase().replace(/-(.)/g, function (_, group1) {
        return group1.toUpperCase();
    });
}
exports.camelcase = camelcase;
;
var idCounter = 0;
function uniqueId(prefix = "") {
    return prefix + (++idCounter);
}
exports.uniqueId = uniqueId;
function indexOf(array, item) {
    for (var i = 0, len = array.length; i < len; i++)
        if (array[i] === item)
            return i;
    return -1;
}
exports.indexOf = indexOf;
// Because IE/edge stinks!
const ElementProto = (typeof Element !== 'undefined' && Element.prototype) || {};
const matchesSelector = ElementProto.matches ||
    ElementProto.webkitMatchesSelector ||
    ElementProto.mozMatchesSelector ||
    ElementProto.msMatchesSelector ||
    ElementProto.oMatchesSelector || function (selector) {
    var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
    return !!~indexOf(nodeList, this);
};
function matches(elm, selector) {
    return matchesSelector.call(elm, selector);
}
exports.matches = matches;
