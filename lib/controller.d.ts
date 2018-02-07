import { AbstractView } from './abstract-view';
export declare class Controller<E extends Element = HTMLElement> extends AbstractView<E> {
    setElement(el?: E): this;
}
