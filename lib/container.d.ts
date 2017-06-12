import { Container } from 'slick-di';
import { IView } from './types';
export declare class ViewContainer extends Container {
    mount<T extends IView>(el: Element, mountable: new (...args: any[]) => T): T;
}
export declare function container(): ViewContainer;
