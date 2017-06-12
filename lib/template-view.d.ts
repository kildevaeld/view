import { BaseView } from './view';
export declare class View<T extends Element> extends BaseView<T> {
    render(): this;
    protected renderTemplate(): void;
}
