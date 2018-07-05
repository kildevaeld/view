import { StringMap } from './types';
import { indexOf } from '@viewjs/utils';

// Because IE/edge stinks!
const ElementProto: any = (typeof Element !== 'undefined' && Element.prototype) || {};

const matchesSelector = ElementProto.matches ||
    ElementProto.webkitMatchesSelector ||
    ElementProto.mozMatchesSelector ||
    ElementProto.msMatchesSelector ||
    ElementProto.oMatchesSelector || function (this: Element, selector: string) {
        var nodeList = ((this.parentNode || document) as Element).querySelectorAll(selector) || [];
        return !!~indexOf(nodeList, this);
    };


export function matches(elm: Element, selector: string): boolean {
    return matchesSelector.call(elm, selector)
}

const kUIRegExp = /@(?:ui\.)?([a-zA-Z_\-\$#\d]+)/i;

export function normalizeUIKeys(obj: any, uimap: StringMap): StringMap {
    let o: { [key: string]: any } = {}, k, v;
    for (k in obj) {
        v = obj[k];
        k = normalizeUIString(k, uimap);
        o[k] = v;
    }
    return o;
}

export function normalizeUIString(str: string, uimap: StringMap): string {
    let ms, ui, sel;
    if ((ms = kUIRegExp.exec(str)) != null) {
        ui = ms[1], sel = uimap[ui];
        if (sel != null) str = str.replace(ms[0], sel);
    }
    return str
}

