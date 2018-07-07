import { AbstractView } from './abstract-view';
export declare class Controller<E extends Element = HTMLElement> extends AbstractView<E> {
    private _el;
    setElement(el?: E): this;
    getElement(): E | undefined;
}
