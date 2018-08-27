import { Controller } from '@viewjs/view';
import { Component, } from 'preact';
import { PreactRenderer, ComponentType } from './preact-renderer'
import { isFunction } from '@viewjs/utils';


export class PreactView<P, S = any> extends Controller {
    private _component?: Component<P, S>;
    private _componentElement?: Element;
    private _renderer: PreactRenderer<P, S>;


    get component() {
        return this._component
    }


    constructor(Component: ComponentType<P, S>, public model?: P) {
        super();
        this._renderer = new PreactRenderer<P, S>(Component)
    }

    setElement(el?: HTMLElement) {
        if (this.el !== el) {
            this._destroyComponent();
        }
        return super.setElement(el);
    }

    render() {
        super.render()
        if (!this.el) {
            return this;
        }

        this._renderComponent()

        return this;
    }


    destroy() {
        this._destroyComponent();
        return super.destroy();

    }

    getTemplateData() {
        if (this.model && isFunction((this.model! as any).toJSON)) {
            return (this.model as any).toJSON()
        }
        return this.model
    }


    private _renderComponent() {
        if (!this.el) return;

        const data = Object.assign({}, this.getTemplateData() || {})

        data.ref = (component: any) => this._component = component

        this._componentElement = this._renderer.mount(data, this.el!, this._componentElement)
    }


    private _destroyComponent() {
        if (this._componentElement)
            this._renderer.unmount(this._componentElement);

    }

}