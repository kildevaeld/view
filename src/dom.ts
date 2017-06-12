
export function indexOf<T>(array: ArrayLike<T>, item: T): number {
    for (var i = 0, len = array.length; i < len; i++) if (array[i] === item) return i;
    return -1;
}

const ElementProto: any = (typeof Element !== 'undefined' && Element.prototype) || {};

const matchesSelector = ElementProto.matches ||
    ElementProto.webkitMatchesSelector ||
    ElementProto.mozMatchesSelector ||
    ElementProto.msMatchesSelector ||
    ElementProto.oMatchesSelector || function (this: Element, selector: string) {
        var nodeList = ((this.parentNode || document) as any).querySelectorAll(selector) || [];
        return !!~indexOf(nodeList, this);
    }


export type EventListener = (...args: any[]) => void;

const elementAddEventListener = ElementProto.addEventListener || function (this: any, eventName: string, listener: EventListener) {
    return this.attachEvent('on' + eventName, listener);
}

const elementRemoveEventListener = ElementProto.removeEventListener || function (this: any, eventName: string, listener: EventListener) {
    return this.detachEvent('on' + eventName, listener);
}

export function matches(elm: Element, selector: string): boolean {
    return matchesSelector.call(elm, selector)
}


export function addEventListener(elm: EventTarget, eventName: string, listener: EventListener, useCap: boolean = false) {
    elementAddEventListener.call(elm, eventName, listener, useCap)
}

export function removeEventListener(elm: EventTarget, eventName: string, listener: EventListener) {
    elementRemoveEventListener.call(elm, eventName, listener)
}
