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
            throw new TypeError('must be a function');
        }
        const key = `${eventName} ${selector}`;
        if (target.events && utils_1.has(target.events, key)) {
            let old = target.events[key];
            if (!Array.isArray(old))
                old = [old];
            old.push(property);
            target.events[key] = old;
        }
        else {
            target.events = utils_1.extend(target.events || {}, {
                [key]: property
            });
        }
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
