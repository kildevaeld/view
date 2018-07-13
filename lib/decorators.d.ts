import { View, BaseViewOptions } from './base-view';
import { Constructor } from '@viewjs/utils';
import { EventsMap, StringMap, TriggerMap, IView } from './types';
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
export declare function className(name: string): <T extends Constructor<U>, U>(target: T) => void;
export declare function attributes(attrs: AttributesOptions): <T extends Constructor<View<U, O>>, U extends Element, O extends BaseViewOptions<U>>(target: T) => void;
export declare function event(eventName: string, selector: string): <T extends View<U, O>, U extends Element = Element, O extends BaseViewOptions<U> = BaseViewOptions<U>, E extends Event = Event>(target: T, property: string | number | symbol, desc: TypedPropertyDescriptor<(e: E) => any> | TypedPropertyDescriptor<() => any>) => void;
export declare namespace event {
    function click(selector: string): <T extends View<U, O>, U extends Element = Element, O extends BaseViewOptions<U> = BaseViewOptions<U>, E extends Event = Event>(target: T, property: string | number | symbol, desc: TypedPropertyDescriptor<(e: E) => any> | TypedPropertyDescriptor<() => any>) => void;
    function change(selector: string): <T extends View<U, O>, U extends Element = Element, O extends BaseViewOptions<U> = BaseViewOptions<U>, E extends Event = Event>(target: T, property: string | number | symbol, desc: TypedPropertyDescriptor<(e: E) => any> | TypedPropertyDescriptor<() => any>) => void;
    function keypress(selector: string, keyCodes?: number[] | number): <T extends View<U, O>, U extends Element = Element, O extends BaseViewOptions<U> = BaseViewOptions<U>>(target: T, property: string | number | symbol, desc: TypedPropertyDescriptor<(e: KeyboardEvent) => any> | TypedPropertyDescriptor<() => any>) => void;
    function keydown(selector: string, keyCodes?: number[] | number): <T extends View<U, O>, U extends Element = Element, O extends BaseViewOptions<U> = BaseViewOptions<U>>(target: T, property: string | number | symbol, desc: TypedPropertyDescriptor<(e: KeyboardEvent) => any> | TypedPropertyDescriptor<() => any>) => void;
    function keyup(selector: string, keyCodes?: number[] | number): <T extends View<U, O>, U extends Element = Element, O extends BaseViewOptions<U> = BaseViewOptions<U>>(target: T, property: string | number | symbol, desc: TypedPropertyDescriptor<(e: KeyboardEvent) => any> | TypedPropertyDescriptor<() => any>) => void;
}
export interface AttachOptions {
    optional?: boolean;
    view?: Constructor<IView>;
}
/**
 * Mount a view on the target and bind matched element
 *
 * @export
 * @param {string} selector
 * @returns
 */
export declare function attach(selector: string, options?: AttachOptions): <T extends IViewAttachable>(target: T, prop: string) => void;
//# sourceMappingURL=decorators.d.ts.map