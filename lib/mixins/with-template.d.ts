import { Constructor, IView } from '../types';
export interface IViewTemplate<M> {
    model: M;
    /**
     * Template
     *
     *
     * @memberof IViewTemplate
     */
    template?: string | ((data: M) => string | Element);
    getTemplateData(): any;
    renderTemplate(): void;
}
export declare function withTemplate<T extends Constructor<IView>, M = any>(Base: T): Constructor<IViewTemplate<M>> & T;
