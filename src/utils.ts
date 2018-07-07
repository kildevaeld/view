import { StringMap } from './types';

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

