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
export declare function event(eventName: string, selector: string): <T extends BaseView<U>, U extends Element>(target: T, property: PropertyKey, desc: TypedPropertyDescriptor<Function>) => void;
export declare namespace event {
    function click(selector: string): <T extends BaseView<U>, U extends Element>(target: T, property: PropertyKey, desc: TypedPropertyDescriptor<Function>) => void;
    function change(selector: string): <T extends BaseView<U>, U extends Element>(target: T, property: PropertyKey, desc: TypedPropertyDescriptor<Function>) => void;
}
