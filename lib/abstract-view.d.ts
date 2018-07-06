import { IView } from './types';
import { Base } from '@viewjs/utils';
export declare abstract class AbstractView<T extends Element> extends Base implements IView {
    protected _el?: T;
    el: T | undefined;
    render(): this;
    destroy(): this;
    protected abstract setElement(el?: T): this;
}
