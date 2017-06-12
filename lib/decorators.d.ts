import { EventsMap, StringMap, BaseView } from './base-view';
import { Constructor } from './types';
export interface TriggerOptions {
    event: string;
    preventDefault?: boolean;
    stopPropagation?: boolean;
}
export declare type TriggerMap = {
    [key: string]: string | TriggerOptions;
};
export interface AttributesOptions {
    events?: EventsMap;
    ui?: StringMap;
    triggers?: TriggerMap;
}
export declare function attributes(attrs: AttributesOptions): <T extends Constructor<BaseView<U>>, U extends Element>(target: T) => void;
export declare function events(events: {
    [key: string]: string | Function;
}): <T extends Constructor<BaseView<U>>, U extends Element>(target: T) => void;
export declare function triggers(triggers: {
    [key: string]: string;
}): <T extends Constructor<BaseView<U>>, U extends Element>(target: T) => void;
export declare function ui(ui: {
    [key: string]: string;
}): <T extends Constructor<BaseView<U>>, U extends Element>(target: T) => void;
