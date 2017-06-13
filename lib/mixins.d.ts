import { BaseView, BaseViewConstructor } from './base-view';
import { IView, Constructor } from './types';
export interface ViewMapOptions<T extends BaseView<U>, U extends Element> {
    selector: string;
    view: BaseViewConstructor<T, U>;
    [key: string]: any;
}
export interface ViewMap {
    [key: string]: ViewMapOptions<any, any>;
}
export interface IViewMountable {
    _views: ViewMap;
}
export declare function ViewMountable<T extends Constructor<IView>>(Base: T): T;
export declare namespace ViewMountable {
    interface IInvoker {
        get<T>(key: any): T;
    }
    var Invoker: {
        get<T extends IView>(V: Constructor<T>): T;
    };
}
export declare namespace Events {
    const BeforeRender = "before:render";
    const Render = "render";
    const BeforeSetElement = "before:set:element";
    const SetElement = "set:element";
    const BeforeDelegateEvents = "before:delegate:events";
    const DelegateEvents = "delegate:events";
    const BeforeUndelegateEvents = "before:undelegate:events";
    const UndelegateEvents = "undelegate:events";
    const BeforeDestroy = "before:destroy";
    const Destroy = "destroy";
}
export declare function ViewObservable<T extends Constructor<BaseView<U>>, U extends Element>(Base: T): T;
