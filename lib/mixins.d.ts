import { BaseView, BaseViewConstructor } from './base-view';
import { IView, Constructor } from './types';
export interface ViewOptions<T extends BaseView<U>, U extends Element> {
    selector: string;
    view: BaseViewConstructor<T, U>;
    [key: string]: any;
}
export interface ViewMap {
    [key: string]: ViewOptions<any, any>;
}
export interface IViewMountable {
    _views: ViewMap;
}
export declare function ViewMountable<T extends Constructor<IView>>(Base: T): Constructor<IViewMountable> & T;
export declare namespace ViewMountable {
    interface IInvoker {
        get<T>(key: any): T;
    }
    var Invoker: {
        get<T extends IView>(V: Constructor<T>): T;
    };
}
export declare function view(selector: string): <T extends IViewMountable>(target: T, prop: PropertyKey) => void;
