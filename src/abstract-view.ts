import { IView } from './types';
import { Base } from '@viewjs/utils';

export abstract class AbstractView<T extends Element> extends Base implements IView {

    get el(): T | undefined { return this.getElement(); }
    set el(el: T | undefined) { this.setElement(el); }

    render(): this { return this; }

    destroy(): this { return this; }

    protected abstract setElement(el?: T): this;
    protected abstract getElement(): T | undefined;

}