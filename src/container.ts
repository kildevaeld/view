import { Container } from 'slick-di';
import { IView } from './types';

export class ViewContainer extends Container {

    mount<T extends IView>(el: Element, mountable: new (...args: any[]) => T): T {
        let v = this.get<T>(mountable);
        v.el = el;
        return v;
    }

}

var _container: ViewContainer;
export function container(): ViewContainer {
    if (!_container) _container = new ViewContainer;
    return _container;
}