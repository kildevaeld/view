import { BaseView, BaseViewOptions } from './base-view';
export declare class View extends BaseView<HTMLElement> {
    readonly options: BaseViewOptions<HTMLElement>;
    constructor(options?: BaseViewOptions<HTMLElement>);
}
