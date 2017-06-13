import { AbstractView } from './abstract-view';
export declare type EventsMap = {
    [key: string]: Function | string;
};
export declare type StringMap = {
    [key: string]: string;
};
export declare type UIMap = {
    [key: string]: HTMLElement;
};
export interface DelegateEvent extends Event {
    delegateTarget?: Element;
}
export declare function normalizeUIKeys(obj: any, uimap: StringMap): StringMap;
export interface BaseViewConstructor<T extends BaseView<U>, U extends Element> {
    new (...args: any[]): T;
    readonly prototype: T;
}
export interface BaseViewOptions<T extends Element> {
    el?: T;
    attachId?: boolean;
}
export declare class BaseView<T extends Element> extends AbstractView<T> {
    private _options;
    static find(selector: string, context: HTMLElement): NodeList;
    events: EventsMap;
    ui: UIMap;
    triggers: StringMap;
    private _ui;
    private _domEvents;
    private _vid;
    readonly vid: string;
    readonly options: BaseViewOptions<T>;
    constructor(_options?: BaseViewOptions<T>);
    delegateEvents(events?: EventsMap): any;
    undelegateEvents(): this;
    delegate(eventName: string, selector?: string | Function, listener?: Function): this | ((e: DelegateEvent) => void);
    undelegate(eventName: string, selector?: string | Function, listener?: Function): this;
    render(): this;
    setElement(el?: T, trigger?: boolean): this;
    destroy(): any;
    private _bindUIElements();
    private _unbindUIElements();
    private _configureTriggers();
    private _buildViewTrigger(triggerDef);
}
