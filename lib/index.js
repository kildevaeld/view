"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./controller"));
__export(require("./view"));
__export(require("./event-emitter"));
__export(require("./mixins"));
__export(require("./decorators"));
__export(require("./base-view"));
const mixins_1 = require("./mixins");
function mount(el, mountable) {
    let view = mixins_1.ViewMountable.Invoker.get(mountable);
    if (view)
        view.el = el;
    return view;
}
exports.mount = mount;
//export * from './test'; 
