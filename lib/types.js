"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
