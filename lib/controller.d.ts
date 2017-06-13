import { AbstractView } from './abstract-view';
import { IViewMountable } from './mixins';
export declare class Controller extends AbstractView<Element> {
    setElement(el?: Element, trigger?: boolean): void;
}
declare const ViewController_base: (new (...args: any[]) => IViewMountable) & typeof Controller;
export declare class ViewController extends ViewController_base implements IViewMountable {
}
