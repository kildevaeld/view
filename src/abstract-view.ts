import { EventEmitter } from './event-emitter';
import { IView } from './types';

export abstract class AbstractView<T extends Element> extends EventEmitter implements IView {

    protected _el?: T;
    get el(): T | undefined { return this._el; }
    set el(el: T | undefined) { this.setElement(el); }

    render() { return this; }

    destroy() {
        this.off();
    }

    abstract setElement(el?: Element, trigger?: boolean): void;

}