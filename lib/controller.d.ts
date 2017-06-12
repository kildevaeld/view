import { AbstractView } from './abstract-view';
export declare namespace Events {
    const BeforeSetElement = "before:set:element";
    const SetElement = "set:element";
}
export declare class Controller extends AbstractView<Element> {
    setElement(el?: Element, trigger?: boolean): void;
}
