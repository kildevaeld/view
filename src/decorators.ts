import { BaseView } from './base-view'
import { extend, has } from '@viewjs/utils';
import { EventsMap, StringMap, Constructor, TriggerMap, UIMap } from './types';
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


export function attributes(attrs: AttributesOptions) {
    return function <T extends Constructor<BaseView<U, Map>>, U extends Element, Map extends UIMap>(target: T) {
        extend(target.prototype, attrs);
    }
}

export function event(eventName: string, selector: string) {
    return function <T extends BaseView<U>, U extends Element = Element, E extends Event = Event>(target: T, property: PropertyKey, desc: TypedPropertyDescriptor<(e: E) => any> | TypedPropertyDescriptor<() => any>) {
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