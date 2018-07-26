import { StringMap } from './types';
import { has } from '@viewjs/utils';

const kUIRegExp = /@(?:ui\.)?([a-zA-Z_\-\$#\d]+)/i;

export function normalizeUIKeys<T extends { [key: string]: any }>(obj: T, uimap: StringMap): T {
    let o: any = {}, k, v;
    for (k in obj) {
        v = obj[k];
        k = normalizeUIString(k, uimap);
        if (has(o, k)) {
            if (!Array.isArray(o[k])) (o[k] as any) = [o[k]];
            (o[k] as any[]).push(v);
        } else {
            o[k] = v;
        }

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

