import { BaseView, BaseViewConstructor } from './view';
import { EventEmitter } from './event-emitter';
export declare const Views: symbol;
export declare namespace Events {
    const BeforeSetElement = "before:set:element";
    const SetElement = "set:element";
    const BeforeRender = "before:render";
    const Render = "render";
}
export interface ViewOptions<T extends BaseView<U>, U extends Element> {
    selector: string;
    view: BaseViewConstructor<T, U>;
    [key: string]: any;
}
export declare class Controller<T extends Element> extends EventEmitter {
    private _views;
    private _el;
    el: T;
    render(): this | undefined;
    destroy(): void;
    setElement(el: T, trigger?: boolean): this | undefined;
    private _bindViews(views);
    private _unbindViews(views);
}
export declare function view(selector: string): PropertyDecorator;
