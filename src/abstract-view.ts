import { IView } from './types';

export abstract class AbstractView<T extends Element> implements IView {

    protected _el?: T;
    get el(): T | undefined { return this._el; }
    set el(el: T | undefined) { this.setElement(el); }

    render() { return this; }

    destroy() {

    }

    abstract setElement(el?: Element): void;

}