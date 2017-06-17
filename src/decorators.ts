import { EventsMap, StringMap, BaseView } from './base-view'
import { extend } from './utils';
import { Constructor } from './types';

export interface TriggerOptions {
    event: string;
    preventDefault?: boolean;
    stopPropagation?: boolean;
}

export type TriggerMap = { [key: string]: string | TriggerOptions };

export interface AttributesOptions {
    events?: EventsMap;
    ui?: StringMap;
    triggers?: TriggerMap;
    [key: string]: any;
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
            throw new Error('must be a function');
        }

        target.events = extend(target.events || {}, {
            [`${eventName} ${selector}`]: property
        });

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
