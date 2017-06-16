import { BaseView, BaseViewOptions } from './base-view';
export interface ViewOptions extends BaseViewOptions<Element> {
    ensureElement?: string;
}
export declare class View extends BaseView<Element> {
    readonly options: ViewOptions;
    constructor(options?: ViewOptions);
}
