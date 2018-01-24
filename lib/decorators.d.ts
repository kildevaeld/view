import { BaseView } from './base-view';
import { EventsMap, StringMap, Constructor, TriggerMap, UIMap } from './types';
import { IViewAttachable } from './mixins';
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
export declare function attributes(attrs: AttributesOptions): <T extends Constructor<BaseView<U, Map>>, U extends Element, Map extends UIMap>(target: T) => void;
export declare function event(eventName: string, selector: string): <T extends BaseView<U, UIMap>, U extends Element, E extends Event>(target: T, property: PropertyKey, desc: TypedPropertyDescriptor<(e: E) => any>) => void;
export declare namespace event {
    function click(selector: string): <T extends BaseView<U, UIMap>, U extends Element, E extends Event>(target: T, property: PropertyKey, desc: TypedPropertyDescriptor<(e: E) => any>) => void;
    function change(selector: string): <T extends BaseView<U, UIMap>, U extends Element, E extends Event>(target: T, property: PropertyKey, desc: TypedPropertyDescriptor<(e: E) => any>) => void;
}
export interface MountOptions {
    optional?: boolean;
}
/**
 * Mount a view on the target and bind matched element
 *
 * @export
 * @param {string} selector
 * @returns
 */
export declare function attach(selector: string, options?: MountOptions): <T extends IViewAttachable>(target: T, prop: string) => void;
