import { BaseView } from './base-view'
import { extend, has } from './utils';
import { EventsMap, StringMap, Constructor, TriggerMap } from './types';



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


export function attributes(attrs: AttributesOptions) {
    return function <T extends Constructor<BaseView<U>>, U extends Element>(target: T) {
        extend(target.prototype, attrs);
    }
}

export function event(eventName: string, selector: string) {
    return function <T extends BaseView<U>, U extends Element>(target: T, property: PropertyKey, desc: TypedPropertyDescriptor<Function>) {
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

export namespace event {

    export function click(selector: string) {
        return event('click', selector);
    }

    export function change(selector: string) {
        return event('change', selector);
    }
}
