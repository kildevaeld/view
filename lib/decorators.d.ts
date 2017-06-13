import { EventsMap, StringMap, BaseView } from './base-view';
import { Constructor, IView } from './types';
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
export declare function event(eventName: string, selector: string): <T extends BaseView<U>, U extends Element>(target: T, property: PropertyKey, desc: PropertyDescriptor) => void;
export declare namespace event {
    function click(selector: string): <T extends BaseView<U>, U extends Element>(target: T, property: PropertyKey, desc: PropertyDescriptor) => void;
    function change(selector: string): <T extends BaseView<U>, U extends Element>(target: T, property: PropertyKey, desc: PropertyDescriptor) => void;
}
export declare function view(selector: string): <T extends IView>(target: T, prop: PropertyKey) => void;
