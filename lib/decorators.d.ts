import { BaseView } from './base-view';
import { EventsMap, StringMap, Constructor } from './types';
export interface TriggerOptions {
    event: string;
    preventDefault?: boolean;
    stopPropagation?: boolean;
}
/**
 * A key-value maps
 * @example
 *  "<dom-event> <selector>": "<event>" | TriggerOptions
 *  "<dom-event> <ui>": ...
 *
 * @export
 * @interface TriggerMap
 */
export interface TriggerMap {
    [key: string]: string | TriggerOptions;
}
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
export declare function attributes(attrs: AttributesOptions): <T extends Constructor<BaseView<U>>, U extends Element>(target: T) => void;
export declare function event(eventName: string, selector: string): <T extends BaseView<U>, U extends Element>(target: T, property: PropertyKey, desc: TypedPropertyDescriptor<Function>) => void;
export declare namespace event {
    function click(selector: string): <T extends BaseView<U>, U extends Element>(target: T, property: PropertyKey, desc: TypedPropertyDescriptor<Function>) => void;
    function change(selector: string): <T extends BaseView<U>, U extends Element>(target: T, property: PropertyKey, desc: TypedPropertyDescriptor<Function>) => void;
}
