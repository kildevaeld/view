import { BaseView, BaseViewConstructor } from './view';
import { IView } from './types';
export declare type Constructor<T> = new (...args: any[]) => T;
export interface ViewOptions<T extends BaseView<U>, U extends Element> {
    selector: string;
    view: BaseViewConstructor<T, U>;
    [key: string]: any;
}
export declare function ViewMountable<T extends Constructor<IView>>(Base: T): T;
