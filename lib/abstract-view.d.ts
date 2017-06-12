import { EventEmitter } from './event-emitter';
import { IView } from './types';
export declare abstract class AbstractView<T extends Element> extends EventEmitter implements IView {
    protected _el?: T;
    el: T | undefined;
    render(): this;
    destroy(): void;
    abstract setElement(el?: Element, trigger?: boolean): void;
}
