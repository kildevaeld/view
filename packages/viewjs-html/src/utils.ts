import { isString, slice, isElement, AnyMap, has } from '@viewjs/utils';
import { Html } from './html';


export type StringMap = { [key: string]: string };

/**
 * Get value from HTML Elemement
 * 
 * @export
 * @param {HTMLElement} el 
 * @param {boolean} [coerce=false] 
 * @returns 
 */
export function getValue(el: HTMLElement, coerce: boolean = false) {
    const tagName = el.tagName.toLocaleLowerCase(),
        type = (<any>el).type,
        isInput = tagName, isCheckbox = /checkbox/.test(type),
        isSelect = /select/.test(el.nodeName);

    if (isCheckbox) {
        return Boolean((el as HTMLInputElement).checked);
    } else if (isSelect) {
        if (!coerce) return (el as HTMLInputElement).value || '';
        let option = (el as HTMLSelectElement).options[(el as HTMLSelectElement).selectedIndex];
        return { value: option.value, text: option.innerText };
    } else if (isInput) {
        const input = (el as HTMLInputElement)
        return input.value;
    }

    return el.textContent;

}

/**
 * Set value on an HTMLElmenet
 * 
 * @export
 * @param {HTMLElement} el 
 * @param {*} [value] 
 */
export function setValue(el: HTMLElement, value?: any, unsafe = true) {
    const tagName = el.tagName.toLocaleLowerCase(),
        type = (<any>el).type || '',
        isInput = tagName, isCheckbox = /checkbox/.test(type),
        isRadio = /radio/.test(type),
        isRadioOrCheckbox = isRadio || isCheckbox,
        isSelect = /select/.test(el.nodeName);

    if (value == null) {
        value = "";
    }

    if (isRadioOrCheckbox) {
        if (isRadio) {
            if (String(value) === String((<any>el).value)) {
                (el as HTMLInputElement).checked = true;
            }
        } else {
            (el as HTMLInputElement).checked = value;
        }
    } else if (String(value) !== getValue(el)) {
        if (isInput || isSelect) {
            (el as HTMLInputElement).value = value;
        } else {
            if (unsafe)
                el.innerHTML = value
            else
                el.textContent = value;
        }
    }

}

const singleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

function parseHTML(html: string): Array<Element> {
    let parsed = singleTag.exec(html);

    if (parsed) {
        return [document.createElement(parsed[1])];
    }
    var div = document.createElement('div');
    div.innerHTML = html;
    return slice(div.children)
}

function isArrayLike<T>(item: any): item is ArrayLike<T> {
    return (
        Array.isArray(item) ||
        (!!item &&
            typeof item === "object" &&
            typeof (item.length) === "number" &&
            (item.length === 0 ||
                (item.length > 0 &&
                    (item.length - 1) in item)
            )
        )
    );
}

export function isIterable<T>(obj: any): obj is Iterable<T> {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

export function normalize(query: string | HTMLElement | Element | Html | Node | ArrayLike<Html> | ArrayLike<Node> | ArrayLike<Element>, context?: string | Element, out: Element[] = []): Array<HTMLElement> {
    if (isString(context)) {
        let q = document.querySelector(context);
        if (!q) throw new ReferenceError("could not resolve context " + context);
        context = q;
    }

    if (isString(query)) {
        if (query.length > 0 && query[0] === '<' && query[query.length - 1] === ">"
            && query.length >= 3) {
            out.push(...parseHTML(query));
        } else {
            const o = (context ? context : document).querySelectorAll(query)
            out.push(...slice(o));
        }

    } else if (isElement(query)) {
        out.push(query);
    } else if (query && query instanceof Html) {
        out.push(...(query as any)._elements);
    } else if (isArrayLike(query)) {
        for (let i = 0, ii = query.length; i < ii; i++) {
            normalize(query[i], context, out);
        }
    }
    return out as HTMLElement[];
}


const kUIRegExp = /@(?:ui\.)?([a-zA-Z_\-\$#\d]+)/i;

export function normalizeUIKeys<T extends AnyMap>(obj: T, uimap: StringMap): T {
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