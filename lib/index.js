"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./controller"));
__export(require("./view"));
__export(require("./event-emitter"));
__export(require("./container"));
const container_1 = require("./container");
function mount(el, mountable) {
    return container_1.container().mount(el, mountable);
}
exports.mount = mount;
