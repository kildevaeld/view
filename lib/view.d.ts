import { BaseView } from './base-view';
export declare class View extends BaseView<Element> {
    render(): this;
    destroy(): void;
    protected renderTemplate(): void;
}
