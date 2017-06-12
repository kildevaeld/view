"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function indexOf(array, item) {
    for (var i = 0, len = array.length; i < len; i++)
        if (array[i] === item)
            return i;
    return -1;
}
exports.indexOf = indexOf;
const ElementProto = (typeof Element !== 'undefined' && Element.prototype) || {};
const matchesSelector = ElementProto.matches ||
    ElementProto.webkitMatchesSelector ||
    ElementProto.mozMatchesSelector ||
    ElementProto.msMatchesSelector ||
    ElementProto.oMatchesSelector || function (selector) {
    var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
    return !!~indexOf(nodeList, this);
};
const elementAddEventListener = ElementProto.addEventListener || function (eventName, listener) {
    return this.attachEvent('on' + eventName, listener);
};
const elementRemoveEventListener = ElementProto.removeEventListener || function (eventName, listener) {
    return this.detachEvent('on' + eventName, listener);
};
function matches(elm, selector) {
    return matchesSelector.call(elm, selector);
}
exports.matches = matches;
function addEventListener(elm, eventName, listener, useCap = false) {
    elementAddEventListener.call(elm, eventName, listener, useCap);
}
exports.addEventListener = addEventListener;
function removeEventListener(elm, eventName, listener) {
    elementRemoveEventListener.call(elm, eventName, listener);
}
exports.removeEventListener = removeEventListener;
