import { AbstractView } from './abstract-view';


export class Controller<E extends Element = HTMLElement> extends AbstractView<E> {
    setElement(el?: E) {
        this._el = el;
        return this;
    }
}