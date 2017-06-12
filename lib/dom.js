"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function indexOf(array, item) {
    for (var i = 0, len = array.length; i < len; i++)
        if (array[i] === item)
            return i;
    return -1;
}
exports.indexOf = indexOf;
/*
export function unique<T>(array: T[]): T[] {
    let seen = new Map<T, boolean>();
    return array.filter(function (e, _) {
        if (seen.has(e)) return false;
        seen.set(e, true);
        return true;
    });
}

const _slice = Array.prototype.slice;
export function slice<T extends Element>(array: ArrayLike<T>, begin?: number, end?: number): T[] {
    return _slice.call(array, begin, end);
}*/
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
/*
export function hasClass(elm: Element, className: string) {

    if (elm.classList) {
        return elm.classList.contains(className);
    }
    var reg = new RegExp('\b' + className)
    return reg.test(elm.className)
}

export function addClass(elm: Element, className: string) {
    if (elm.classList) {
        let split = className.split(' ');
        for (let i = 0, ii = split.length; i < ii; i++) {
            if (elm.classList.contains(split[i].trim())) continue;
            elm.classList.add(split[i].trim());
        }
    } else {
        elm.className = unique(elm.className.split(' ').concat(className.split(' '))).join(' ')
    }
}

export function removeClass(elm: Element, className: string) {
    if (elm.classList) {
        let split = className.split(' ');
        for (let i = 0, ii = split.length; i < ii; i++) {
            elm.classList.remove(split[i].trim());
        }
    } else {
        let split = elm.className.split(' '),
            classNames = className.split(' '),
            index

        for (let i = 0, ii = classNames.length; i < ii; i++) {
            index = split.indexOf(classNames[i])
            if (!!~index) split = split.splice(index, 1)
        }
    }
}

export function toggleClass(elm: Element, classNames: string) {
    const classes = classNames.split(' ').map(m => m.trim());

    for (const cl of classes) {
        if (hasClass(elm, cl)) removeClass(elm, cl);
        else addClass(elm, cl);
    }

}


export function getOffset(el: HTMLElement) {
    let _x = 0, _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent as HTMLElement;
    }
    return { top: _y, left: _x };
}*/
