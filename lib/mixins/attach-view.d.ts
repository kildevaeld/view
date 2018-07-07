import { IView } from '../types';
import { Constructor } from '@viewjs/utils';
export interface IViewAttachable {
    views: ViewMap;
}
export interface ViewMapOptions {
    selector: string;
    view: Constructor<IView>;
    optional: boolean;
    [key: string]: any;
}
export interface ViewMap {
    [key: string]: ViewMapOptions;
}
export declare function withAttachedViews<T extends Constructor<IView>>(Base: T): Constructor<IViewAttachable> & T;
//# sourceMappingURL=attach-view.d.ts.map