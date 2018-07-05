"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@viewjs/utils");
class Base {
}
exports.Base = Base;
;
;
const defaultInvoker = {
    get(V) {
        if (typeof Reflect !== 'undefined' && typeof Reflect.construct === 'function')
            return Reflect.construct(V, []);
        return new V();
    }
};
exports.Invoker = defaultInvoker;
function setInvoker(i) {
    if (!i)
        i = defaultInvoker;
    exports.Invoker = i;
}
exports.setInvoker = setInvoker;
exports.debug = localStorage && localStorage.getItem("viewjs.debug") != null
    ? (namespace) => (...args) => {
        const l = args.length;
        if (l && utils_1.isString(args[0])) {
            args[0] = namespace + ' ' + args[0];
        }
        else if (l) {
            args.unshift(namespace);
        }
        else
            return;
        console.log(...args.map(m => (utils_1.isObject(m) && m instanceof Base) ? String(m) : m));
    }
    : (_) => () => { };
