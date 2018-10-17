import { IRenderer, TemplateRef } from '@viewjs/view';
import { ComponentClass, createElement, StatelessComponent } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

export type ComponentType<P, S> = ComponentClass<P, S> | StatelessComponent<P> // | FunctionalComponent<P>


export class ReactRenderer<
    P,
    S> implements IRenderer {

    constructor(private Component: ComponentType<P, S>) { }

    mount(attributes: P, container: Element, _prev: Element | undefined): TemplateRef {
        return new Promise(res => {
            let el = createElement(this.Component, attributes);
            render(el, container, () => res({ container }));
        });
    }

    unmount(el: TemplateRef): boolean {
        return unmountComponentAtNode(el.container);

    }
}

export function create<
    T extends ComponentType<P, S>,
    P,
    S>(Component: T) {
    return new ReactRenderer<P, S>(Component);
}
