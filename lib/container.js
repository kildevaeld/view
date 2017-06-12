"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slick_di_1 = require("slick-di");
class ViewContainer extends slick_di_1.Container {
    mount(el, mountable) {
        let v = this.get(mountable);
        v.el = el;
        return v;
    }
}
exports.ViewContainer = ViewContainer;
var _container;
function container() {
    if (!_container)
        _container = new ViewContainer;
    return _container;
}
exports.container = container;
