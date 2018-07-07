import { View, BaseViewOptions } from './base-view'
import { extend, has, callFuncCtx, Constructor } from '@viewjs/utils';
import { EventsMap, StringMap, TriggerMap } from './types';
import { IViewAttachable } from './mixins'

export interface AttributesOptions {
    events?: EventsMap;
    ui?: StringMap;
    triggers?: TriggerMap;
    [key: string]: any;
}

export interface EventOptions {
    preventDefault?: boolean;
    stopPropagation?: boolean;
}

export function className(name: string) {
    return function <T extends Constructor<U>, U>(target: T) {
        Object.defineProperty(target, "name", { value: name });
    };
};


export function attributes(attrs: AttributesOptions) {
    return function <T extends Constructor<View<U, O>>, U extends Element, O extends BaseViewOptions<U>>(target: T) {
        extend(target.prototype, attrs);
    }
}

export function event(eventName: string, selector: string) {
    return function <T extends View<U, O>, U extends Element = Element, O extends BaseViewOptions<U> = BaseViewOptions<U>, E extends Event = Event>(target: T, property: PropertyKey, desc: TypedPropertyDescriptor<(e: E) => any> | TypedPropertyDescriptor<() => any>) {
        if (!desc) throw new Error('no description');
        if (typeof desc.value !== 'function') {
            throw new TypeError('must be a function');
        }

        const key = `${eventName} ${selector}`
        if (target.events && has(target.events, key)) {
            let old = target.events[key]
            if (!Array.isArray(old)) old = [old];
            old.push(property as any);
            target.events[key] = old;
        } else {
            target.events = extend(target.events || {}, {
                [key]: property
            });

        }

    }
}

const keyEventDecorator = function (eventName: string, selector: string, keyCodes?: number[] | number) {
    const factory = event(eventName, selector);
    if (keyCodes && !Array.isArray(keyCodes)) keyCodes = [keyCodes];
    return function <T extends View<U, O>, U extends Element = Element, O extends BaseViewOptions<U> = BaseViewOptions<U>>(target: T, property: PropertyKey, desc: TypedPropertyDescriptor<(e: KeyboardEvent) => any> | TypedPropertyDescriptor<() => any>) {
        if (!desc) throw new Error('no description');
        if (typeof desc.value !== 'function') {
            throw new TypeError('must be a function');
        }


        if (keyCodes) {
            const oldValue = desc.value;
            desc.value = function (e: KeyboardEvent) {
                if (e && e instanceof KeyboardEvent) {
                    if (~(keyCodes as number[]).indexOf(e.keyCode))
                        return oldValue.call(this, e);
                    return;
                }
                const args = Array.prototype.slice.call(arguments);
                return callFuncCtx(oldValue, args, this);
            }
        }

        return factory(target, property, desc);
    }
}

export namespace event {

    export function click(selector: string) {
        return event('click', selector);
    }

    export function change(selector: string) {
        return event('change', selector);
    }

    export function keypress(selector: string, keyCodes?: number[] | number) {
        return keyEventDecorator("keypress", selector, keyCodes);
    }

    export function keydown(selector: string, keyCodes?: number[] | number) {
        return keyEventDecorator("keydown", selector, keyCodes);
    }

    export function keyup(selector: string, keyCodes?: number[] | number) {
        return keyEventDecorator("keyup", selector, keyCodes);
    }
}


export interface MountOptions {
    optional?: boolean
}

/**
 * Mount a view on the target and bind matched element
 *
 * @export
 * @param {string} selector
 * @returns
 */
export function attach(selector: string, options: MountOptions = {}) {
    return function <T extends IViewAttachable>(target: T, prop: string) {

        let View = Reflect.getOwnMetadata("design:type", target, prop);
        if (!View) throw new Error(`design:type does not exists for prop '${prop}' on '${target}'`);
        if (!target.views) target.views = {};
        target.views[prop] = {
            selector: selector,
            view: View,
            optional: typeof options.optional !== 'boolean' ? false : options.optional
        };
    }
}