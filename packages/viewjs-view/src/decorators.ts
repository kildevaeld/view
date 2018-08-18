import { View, BaseViewOptions } from './base-view'
import { has, isFunction, isString } from '@viewjs/utils';
import { EventsMap, EventCall } from './types';
import { Constructor } from '@viewjs/types';

export interface AttributesOptions {
    events?: EventsMap;
    [key: string]: any;
}

export interface EventOptions<E extends Event = Event> {
    condition?: (e: [E]) => boolean;
    selector?: string;
}


export function attributes(attrs: AttributesOptions) {
    return function <T extends Constructor<View<U, O>>, U extends Element, O extends BaseViewOptions<U>>(target: T) {
        Object.assign(target.prototype, attrs);
    }
}

export function event<E extends Event = Event>(eventName: string, selector: string | EventOptions<E>, options?: EventOptions<E>) {
    return function <T extends View<U, O>, U extends Element = Element, O extends BaseViewOptions<U> = BaseViewOptions<U>, E extends Event = Event>(target: T, property: PropertyKey, desc: TypedPropertyDescriptor<(e: E) => any> | TypedPropertyDescriptor<() => any>) {
        if (!desc || !isFunction(desc.value)) {
            throw new TypeError('must be a function');
        }

        if (!isString(selector)) {
            options = selector
            selector = options.selector!
        }

        const call: EventCall = isString(selector) ? (options || {}) : selector as any;
        call.handler = property as string;
        const key = selector ? `${eventName} ${selector}` : eventName;

        let events = target.events;
        if (events && has(events, key)) {
            let old = events[key]
            if (!Array.isArray(old)) old = [old];
            old.push(call);
            events[key] = old;
        } else {
            events = Object.assign(events || {}, {
                [key]: call
            });

        }

        target.events = events;

    }
}


export namespace event {

    export function click(selector: string, condition?: (e: [MouseEvent]) => boolean) {
        return event('click', { selector, condition });
    }

    export function change(selector: string, condition?: (e: [Event]) => boolean) {
        return event('change', { selector, condition });
    }

}
