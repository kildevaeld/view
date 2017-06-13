"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function attributes(attrs) {
    return function (target) {
        utils_1.extend(target.prototype, attrs);
    };
}
exports.attributes = attributes;
function events(events) {
    return function (target) {
        target.prototype.events = events;
    };
}
exports.events = events;
function triggers(triggers) {
    return function (target) {
        target.prototype.triggers = triggers;
    };
}
exports.triggers = triggers;
/*
export function ui<U extends Object>(m: U) {
    return function <T extends Constructor<BaseView<U>>, U extends Element>(target: T) {
        target.prototype.ui = ui;
        return class extends target {
            ui: {
                [K in keyof U]?: Element;
            }
        }
    }
}*/ 
