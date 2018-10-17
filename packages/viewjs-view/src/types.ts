import { isObjectLike, isFunction } from "@viewjs/utils";
import { Destroyable, AnyMap } from '@viewjs/types';

export interface IView extends Destroyable {
    render(): this;
    el?: Element;
}

export type EventHandler<E extends Event = Event> = (event: E) => any;

export interface EventCall {
    ctx?: any;
    handler?: EventHandler<Event> | string;
    condition?: (args: [Event]) => boolean;
}

export interface EventsMap { [key: string]: (EventHandler<Event> | string | EventCall)[] | EventHandler<Event> | string | EventCall }

export type TemplateRef = any;

export interface IRenderer {
    mount(attributes: AnyMap<any>, container: Element, prev: Element | undefined): TemplateRef | Promise<TemplateRef>;
    unmount(el: TemplateRef): boolean;
}


export function isRenderer(a: any): a is IRenderer {
    return a &&
        isObjectLike(a) &&
        isFunction((a as any).mount) &&
        isFunction((a as any).unmount)
}

