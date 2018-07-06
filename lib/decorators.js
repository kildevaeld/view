"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@viewjs/utils");
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
const keyEventDecorator = function (eventName, selector, keyCodes) {
    const factory = event(eventName, selector);
    if (keyCodes && !Array.isArray(keyCodes))
        keyCodes = [keyCodes];
    return function (target, property, desc) {
        if (!desc)
            throw new Error('no description');
        if (typeof desc.value !== 'function') {
            throw new TypeError('must be a function');
        }
        if (keyCodes) {
            const oldValue = desc.value;
            desc.value = function (e) {
                if (~keyCodes.indexOf(e.keyCode))
                    oldValue.call(this, e);
            };
        }
        return factory(target, property, desc);
    };
};
(function (event) {
    function click(selector) {
        return event('click', selector);
    }
    event.click = click;
    function change(selector) {
        return event('change', selector);
    }
    event.change = change;
    function keypress(selector, keyCodes) {
        return keyEventDecorator("keypress", selector, keyCodes);
    }
    event.keypress = keypress;
    function keydown(selector, keyCodes) {
        return keyEventDecorator("keydown", selector, keyCodes);
    }
    event.keydown = keydown;
    function keyup(selector, keyCodes) {
        return keyEventDecorator("keyup", selector, keyCodes);
    }
    event.keyup = keyup;
})(event = exports.event || (exports.event = {}));
/**
 * Mount a view on the target and bind matched element
 *
 * @export
 * @param {string} selector
 * @returns
 */
function attach(selector, options = {}) {
    return function (target, prop) {
        let View = Reflect.getOwnMetadata("design:type", target, prop);
        if (!View)
            throw new Error(`design:type does not exists for prop '${prop}' on '${target}'`);
        if (!target.views)
            target.views = {};
        target.views[prop] = {
            selector: selector,
            view: View,
            optional: typeof options.optional !== 'boolean' ? false : options.optional
        };
    };
}
exports.attach = attach;
