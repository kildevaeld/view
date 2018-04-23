import { Constructor, IView } from '../types';
export interface IViewElement {
    /**
     * Tagname of element. This should be set with @attributes decorator
     *
     * @type {string}
     * @memberof IViewElement
     */
    tagName?: string;
    /**
     * This should be set with the @attributes decorator
     *
     * @type {string}
     * @memberof IViewElement
     */
    className?: string;
    attributes?: {
        [key: string]: string;
    };
    /**
     * Remove element from dom
     *
     * @returns {this}
     *
     * @memberof IViewElement
     */
    remove(): this;
}
export declare function withElement<T extends Constructor<IView>>(Base: T): Constructor<IViewElement> & T;
