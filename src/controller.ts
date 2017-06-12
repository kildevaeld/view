import { triggerMethodOn } from './utils'
import { AbstractView } from './abstract-view';
import {ViewMountable, IViewMountable} from './mixins';
namespace Events {
    export const BeforeSetElement = "before:set:element";
    export const SetElement = "set:element";
}

export class Controller extends AbstractView<Element> {
    setElement(el?: Element, trigger: boolean = false) {
        if (this._el == el) {
            return;
        }

        if (trigger)
            triggerMethodOn(this, Events.BeforeSetElement, this._el, el);
        this._el = el;
        if (trigger)
            triggerMethodOn(this, Events.SetElement, this._el, el);
    }
}

export class ViewController extends ViewMountable(Controller) implements IViewMountable {

    
}
