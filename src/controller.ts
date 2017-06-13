//import { triggerMethodOn } from './utils'
import { AbstractView } from './abstract-view';
import { ViewMountable } from './mixins';
/*namespace Events {
    export const BeforeSetElement = "before:set:element";
    export const SetElement = "set:element";
}*/

export class Controller extends AbstractView<Element> {
    setElement(el?: Element, trigger: boolean = false) {
        if (this._el == el) {
            return;
        }
        this._el = el;

    }
}

export class ViewController extends ViewMountable(Controller) {


}
