import {EventsMap, StringMap, BaseView} from './base-view'
import {extend} from './utils';
import {Constructor} from './types';

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

export function events(events: { [key: string]: string | Function }) {
    return function <T extends Constructor<BaseView<U>>, U extends Element>(target: T) {
        target.prototype.events = events;
    }
}

export function triggers(triggers: { [key: string]: string }) {
    return function <T extends Constructor<BaseView<U>>, U extends Element>(target: T) {
        target.prototype.triggers = triggers;
    }
}

/*
export function ui<U extends Object>(m: U) {
    return function <T extends Constructor<BaseView<U>>, U extends Element>(target: T) {
        target.prototype.ui = ui;
        return class extends target {
            ui: {
                [K in keyof U]?: Element;
            }
        }
    }
}*/