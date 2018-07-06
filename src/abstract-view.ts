import { IView } from './types';
import { Base } from '@viewjs/utils';

export abstract class AbstractView<T extends Element> extends Base implements IView {

    protected _el?: T;
    get el(): T | undefined { return this._el; }
    set el(el: T | undefined) { this.setElement(el); }

    render(): this { return this; }

    destroy() {
        return this;
    }

    protected abstract setElement(el?: T): this;

}