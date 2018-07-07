import { AbstractView } from './abstract-view';
import { StringMap, UIMap, EventsMap } from './types';
export interface DelegateEvent extends Event {
    delegateTarget?: Element;
}
export interface BaseViewConstructor<T extends View<U>, U extends Element> {
    new (...args: any[]): T;
    readonly prototype: T;
}
export declare type EventHandler<E extends Event = Event> = (event: E) => any;
export interface BaseViewOptions<T extends Element> {
    el?: T;
    attachId?: boolean;
    events?: EventsMap;
    [key: string]: any;
}
export declare class View<T extends Element = HTMLElement, OptionsType extends BaseViewOptions<T> = BaseViewOptions<T>> extends AbstractView<T> {
    private _events;
    private _el;
    ui: UIMap;
    triggers: StringMap;
    private _ui;
    private _domEvents;
    private _vid;
    private _options;
    events: EventsMap;
    readonly vid: string;
    readonly options: NonNullable<OptionsType>;
    constructor(options?: OptionsType);
    delegateEvents(events?: EventsMap): any;
    undelegateEvents(): this;
    protected delegate(eventName: string, selector?: string | EventHandler, listener?: EventHandler): this;
    undelegate(eventName: string, selector?: string | EventHandler, listener?: EventHandler): this;
    render(): this;
    setElement(el?: T): this;
    getElement(): T | undefined;
    destroy(): any;
    private _bindUIElements;
    private _unbindUIElements;
    private _configureTriggers;
    private _buildViewTrigger;
    toString(): string;
}
