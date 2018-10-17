import { IRenderer } from '@viewjs/view';
import { ComponentConstructor, FunctionalComponent, h, render } from 'preact';
import { unmountComponent } from './utils';

export type ComponentType<P, S> = ComponentConstructor<P, S> | FunctionalComponent<P>

export class PreactRenderer<
    P,
    S> implements IRenderer {

    constructor(private Component: ComponentType<P, S>) { }

    mount(attributes: P, container: Element, prev: Element | undefined): Element {
        return render(h(this.Component, attributes), container, prev);
    }

    unmount(el: Element): boolean {
        let component = (el as any)._component;
        if (component) {
            unmountComponent(component);
            return true;
        }
        return false;
    }
}

export function create<
    T extends ComponentType<P, S>,
    P,
    S>(Component: T) {
    return new PreactRenderer<P, S>(Component);
}
