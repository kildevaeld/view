"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function attributes(attrs) {
    return function (target) {
        utils_1.extend(target.prototype, attrs);
    };
}
exports.attributes = attributes;
function event(eventName, selector) {
    return function (target, property, desc) {
        if (!desc)
            throw new Error('no description');
        if (typeof desc.value !== 'function') {
            throw new Error('must be a function');
        }
        target.events = utils_1.extend(target.events || {}, {
            [`${eventName} ${selector}`]: property
        });
    };
}
exports.event = event;
(function (event) {
    function click(selector) {
        return event('click', selector);
    }
    event.click = click;
    function change(selector) {
        return event('change', selector);
    }
    event.change = change;
})(event = exports.event || (exports.event = {}));
function view(selector) {
    return function (target, prop) {
        let View = Reflect.getOwnMetadata("design:type", target, prop);
        if (!View)
            throw new Error('design:type does not exists');
        if (!target._views)
            target._views = {};
        target._views[prop] = {
            selector: selector,
            view: View
        };
    };
}
exports.view = view;
