import { EventEmitter } from './event-emitter';
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
    new (...args: any[]): BaseView<U>;
}
export interface BaseViewOptions<T extends Element> {
    el?: T;
}
export declare abstract class BaseView<T extends Element> extends EventEmitter {
    static find(selector: string, context: HTMLElement): NodeList;
    el: T | undefined;
    events: EventsMap;
    ui: UIMap;
    triggers: StringMap;
    private _el?;
    private _ui;
    private _domEvents;
    constructor(options?: BaseViewOptions<T>);
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
    protected triggerMethod(eventName: string, ...args: any[]): void;
}
export interface AttributesOptions {
    events?: EventsMap;
    ui?: StringMap;
    triggers?: StringMap;
}
export declare function attributes(attrs: AttributesOptions): ClassDecorator;
export declare function events(events: {
    [key: string]: string | Function;
}): ClassDecorator;
export declare function triggers(triggers: {
    [key: string]: string;
}): ClassDecorator;
export declare function ui(ui: {
    [key: string]: string;
}): ClassDecorator;
