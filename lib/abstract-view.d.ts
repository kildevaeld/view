import { IView } from './types';
import { Base } from '@viewjs/utils';
export declare abstract class AbstractView<T extends Element> extends Base implements IView {
    el: T | undefined;
    render(): this;
    destroy(): this;
    protected abstract setElement(el?: T): this;
    protected abstract getElement(): T | undefined;
}
