import { AbstractView } from './abstract-view';
import { StringMap, UIMap, EventsMap } from './types';
export interface DelegateEvent extends Event {
    delegateTarget?: Element;
}
export interface BaseViewConstructor<T extends BaseView<U>, U extends Element> {
    new (...args: any[]): T;
    readonly prototype: T;
}
export interface BaseViewOptions<T extends Element> {
    el?: T;
    attachId?: boolean;
}
export declare class BaseView<T extends Element = HTMLElement, OptionsType extends BaseViewOptions<T> = BaseViewOptions<T>> extends AbstractView<T> {
    private _options?;
    static find<T extends Element = Element>(selector: string, context: Element): NodeListOf<T>;
    events: EventsMap;
    ui: UIMap;
    triggers: StringMap;
    private _ui;
    private _domEvents;
    private _vid;
    readonly vid: string;
    readonly options: NonNullable<OptionsType>;
    constructor(_options?: OptionsType | undefined);
    delegateEvents(events?: EventsMap): any;
    undelegateEvents(): this;
    delegate(eventName: string, selector?: string | Function, listener?: Function): this | ((e: DelegateEvent) => void);
    undelegate(eventName: string, selector?: string | Function, listener?: Function): this;
    render(): this;
    protected setElement(el?: T, trigger?: boolean): this;
    destroy(): any;
    private _bindUIElements;
    private _unbindUIElements;
    private _configureTriggers;
    private _buildViewTrigger;
}
