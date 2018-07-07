import { AbstractView } from './abstract-view';



export class Controller<E extends Element = HTMLElement> extends AbstractView<E> {
    private _el: E | undefined;

    setElement(el?: E) {
        this._el = el;
        return this;
    }
    getElement(): E | undefined {
        return this._el;
    }
}