import { EventsMap, StringMap, BaseView } from './base-view'
import { extend } from './utils';
import { Constructor, IView } from './types';
import { IViewMountable } from './mixins'
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
}


export function attributes(attrs: AttributesOptions) {
    return function <T extends Constructor<BaseView<U>>, U extends Element>(target: T) {
        extend(target.prototype, attrs);
    }
}

export function event(eventName: string, selector: string) {
    return function <T extends BaseView<U>, U extends Element>(target: T, property: PropertyKey, desc: PropertyDescriptor) {
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

export function view(selector: string) {
    return function <T extends IView>(target: T, prop: PropertyKey) {
        let View = Reflect.getOwnMetadata("design:type", target, prop as string);
        if (!View) throw new Error('design:type does not exists');
        if (!(<any>target)._views) (<any>target)._views = {};
        (<any>target)._views[prop as string] = {
            selector: selector,
            view: View
        };
    }
}
