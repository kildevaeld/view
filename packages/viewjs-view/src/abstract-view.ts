import { IView } from './types';
import { Base } from '@viewjs/utils';

export abstract class AbstractView<T extends Element> extends Base implements IView {

    get el(): T | undefined { return this.getElement(); }
    set el(el: T | undefined) {
        this.setElement(el);
    }

    render(): this { return this; }

    protected abstract setElement(el?: T): this;
    protected abstract getElement(): T | undefined;

}

export class Controller<T extends Element = HTMLElement> extends AbstractView<T> {

    private _el: T | undefined;

    protected setElement(el?: T | undefined): this {
        this._el = el;
        return this;

    }

    protected getElement(): T | undefined {
        return this._el;
    }

}