import { AbstractView } from './abstract-view';
import { ViewMountable } from './mixins';

export class Controller extends AbstractView<Element> {
    setElement(el?: Element, _: boolean = false) {
        if (this._el == el) {
            return;
        }
        this._el = el;
    }
}

export class ViewController extends ViewMountable(Controller) { }
