import { AbstractView } from './abstract-view';
export declare class Controller extends AbstractView<Element> {
    setElement(el?: Element, trigger?: boolean): void;
}
declare const ViewController_base: typeof Controller;
export declare class ViewController extends ViewController_base {
}
