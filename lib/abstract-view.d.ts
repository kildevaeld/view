import { IView } from './types';
export declare abstract class AbstractView<T extends Element> implements IView {
    protected _el?: T;
    el: T | undefined;
    render(): this;
    destroy(): this;
    protected abstract setElement(el?: Element): this;
}
