import { BaseView, BaseViewOptions } from './base-view';
export interface ViewOptions extends BaseViewOptions<Element> {
    ensureElement?: string;
}
export declare class View extends BaseView<Element> {
    readonly options: ViewOptions;
    constructor(options?: ViewOptions);
    render(): this;
    destroy(): void;
    protected _ensureElement(): void;
    protected renderTemplate(): void;
}
export declare const LayoutView: typeof View;
