"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@viewjs/utils");
// Because IE/edge stinks!
const ElementProto = (typeof Element !== 'undefined' && Element.prototype) || {};
const matchesSelector = ElementProto.matches ||
    ElementProto.webkitMatchesSelector ||
    ElementProto.mozMatchesSelector ||
    ElementProto.msMatchesSelector ||
    ElementProto.oMatchesSelector || function (selector) {
    var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
    return !!~utils_1.indexOf(nodeList, this);
};
function matches(elm, selector) {
    return matchesSelector.call(elm, selector);
}
exports.matches = matches;
const kUIRegExp = /@(?:ui\.)?([a-zA-Z_\-\$#\d]+)/i;
function normalizeUIKeys(obj, uimap) {
    let o = {}, k, v;
    for (k in obj) {
        v = obj[k];
        k = normalizeUIString(k, uimap);
        o[k] = v;
    }
    return o;
}
exports.normalizeUIKeys = normalizeUIKeys;
function normalizeUIString(str, uimap) {
    let ms, ui, sel;
    if ((ms = kUIRegExp.exec(str)) != null) {
        ui = ms[1], sel = uimap[ui];
        if (sel != null)
            str = str.replace(ms[0], sel);
    }
    return str;
}
exports.normalizeUIString = normalizeUIString;
