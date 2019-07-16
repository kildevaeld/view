import { IModel } from '@viewjs/models';
import { EventEmitterListener, isEventEmitter } from '@viewjs/events';
import { getValue, setValue } from '@viewjs/html';
import { Factory } from '@viewjs/utils';

export interface Binding {
    bind(): any;
    unbind(): any;
}


export abstract class AbstractBinding extends EventEmitterListener implements Binding {

    constructor(public el: Element, public model: IModel, public prop: string) {
        super();
    }

    bind() {
        if (isEventEmitter(this.model))
            this.listenTo(this.model, `change:${this.prop}`, this.onModelChange);
    }

    unbind() {
        if (isEventEmitter(this.model))
            this.stopListening(this.model);
    }

    protected abstract onModelChange(): void;

    destroy() {
        this.unbind();
        return super.destroy();
    }


}

const twoWay = ['input', 'textarea', 'select'],
    keyupTypes = ['text', 'number', 'email']


export class ValueBinding extends AbstractBinding {

    private _domEventType: string | undefined;

    constructor(public el: Element, public model: IModel, public prop: string) {
        super(el, model, prop);
        this.onElementChanged = this.onElementChanged.bind(this);
    }

    bind() {

        super.bind()
        let tagName = this.el.tagName.toLowerCase();
        if (~twoWay.indexOf(tagName)) {
            this._domEventType = 'change';
            if ((tagName == 'input' && ~keyupTypes.indexOf(this.el.getAttribute('type')!)) || tagName == 'textarea') {
                this.el.addEventListener('keyup', this.onElementChanged);
                // Firefox autocomplete
                this.el.addEventListener('DOMAutoComplete', this.onElementChanged);
                this._domEventType = 'keyup';
            } else {
                this.el.addEventListener('change', this.onElementChanged);
            }
        }

        this.onModelChange();
    }

    unbind() {
        super.unbind();
        if (this._domEventType && this.el) {
            this.el.removeEventListener(this._domEventType, this.onElementChanged);
        }
        this._domEventType = void 0;
    }

    protected onModelChange(): void {
        setValue(this.el as HTMLElement, this.model.get(this.prop), false);
        this.trigger('model', this.model.get(this.prop));
    }

    protected onElementChanged(e: Event) {
        const val = getValue(this.el as HTMLElement);
        this.model.set(this.prop, val);
        this.trigger('element', val, e);
    }

}


export type BindingFactory = Factory<Binding, [Element, IModel, string]>;

export const bindings: { [key: string]: BindingFactory } = {
    value: (el, model, prop) => new ValueBinding(el, model, prop)
};

