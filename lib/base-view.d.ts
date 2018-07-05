import { AbstractView } from './abstract-view';
import { StringMap, UIMap, EventsMap } from './types';
export interface DelegateEvent extends Event {
    delegateTarget?: Element;
}
export interface BaseViewConstructor<T extends BaseView<U>, U extends Element> {
    new (...args: any[]): T;
    readonly prototype: T;
}
export declare type EventHandler<E extends Event = Event> = (event: E) => any;
export interface BaseViewOptions<T extends Element> {
    el?: T;
    attachId?: boolean;
}
export declare class BaseView<T extends Element = HTMLElement, OptionsType extends BaseViewOptions<T> = BaseViewOptions<T>> extends AbstractView<T> {
    private _options?;
    static find<T extends Element = HTMLElement>(selector: string, context: HTMLElement): NodeListOf<T>;
    private _events;
    ui: UIMap;
    triggers: StringMap;
    private _ui;
    private _domEvents;
    private _vid;
    events: EventsMap;
    readonly vid: string;
    readonly options: NonNullable<OptionsType>;
    constructor(_options?: OptionsType | undefined);
    delegateEvents(events?: EventsMap): any;
    undelegateEvents(): this;
    protected delegate(eventName: string, selector?: string | EventHandler, listener?: EventHandler): this;
    undelegate(eventName: string, selector?: string | EventHandler, listener?: EventHandler): this;
    render(): this;
    protected setElement(el?: T): this;
    destroy(): any;
    private _bindUIElements;
    private _unbindUIElements;
    private _configureTriggers;
    private _buildViewTrigger;
    toString(): string;
}
