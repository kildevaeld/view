import { ModalView } from './modal-view';
import { Resolvable, resolve, isString, isFunction, AnyMap } from '@viewjs/utils';
import { IView, IRenderer, isRenderer, TemplateRef, withElement, attributes, TemplateView } from '@viewjs/view';
import { transitionEnd } from './support';

export interface ModalOptions {
    closeOnEscape?: boolean;
    className?: string;
}

export interface ModalTriggerOptions {
    requestClose: () => any;
    requestAccept: () => any
}

export function isView(v: any): v is IView {
    return v && isFunction(v.render);
}


export class ViewRenderer<V extends IView, M = AnyMap> implements IRenderer {

    private _created = false;

    constructor(private view: V) { }

    mount(_attributes: M, container: Element, _prev: Element | undefined): TemplateRef | PromiseLike<TemplateRef> {
        if (!this.view.el) {
            this._created = true;
            this.view.el = document.createElement('div');
        }

        container.appendChild(this.view.render().el!);

        return this.view;

    }

    unmount(el: TemplateRef): boolean {

        if (el !== this.view) {
            return false;
        }

        if (this._created && this.view.el)
            this.view.el!.remove();

        this.view.destroy();

        return true;
    }

    destroy() {
        this.view.destroy();
        (this.view as any) = void 0;

    }

}

@attributes({
    className: 'modal fade',
    events: {
        click: '_onCloseClick'
    }
})
export class Modal extends withElement(TemplateView) {

    /**
     * Create an instance of a modal
     *
     * @static
     * @param {(Resolvable<IRenderer | IView | string | ModalView>)} modal
     * @param {(ModalOptions & ModalTriggerOptions)} options
     * @returns {PromiseLike<Modal>}
     * @memberof Modal
     */
    static create(modal: Resolvable<IRenderer | IView | string | ModalView, ModalTriggerOptions>, options: ModalOptions & ModalTriggerOptions): PromiseLike<Modal> {

        const model = { requestAccept: options.requestAccept, requestClose: options.requestClose };

        return resolve(modal, options).then(ret => {
            if (ret instanceof ModalView) {
                return ret;
            } else if (isView(ret)) {
                return new ModalView({
                    bodyView: ret,
                    model,
                });

            } else if (isString(ret) || isRenderer(ret)) {
                return new ModalView({
                    bodyView: new TemplateView({ template: ret, model: model }),
                    model
                });

            } else {
                throw TypeError("argument must be renderable");
            }
        }).then((templ) => {
            const view = new Modal({
                template: new ViewRenderer(templ),
                model: model
            });

            if (options.className)
                view.el!.classList.add(options.className);

            return view;
        })
    }

    protected _onCloseClick(e: any) {
        let target = e.target as HTMLElement;

        if (!target.classList.contains('modal-dialog')) {
            target = target.parentElement!;
            while (target) {
                if (target.classList.contains('modal-dialog')) break;
                if (target.classList.contains('modal__close')) break;
                target = target.parentElement!;
            }

        }
        if (!target || target.classList.contains('modal__close')) {
            this.model.requestClose();
        }
    }


    show(): PromiseLike<this> {
        this.el!.classList.add('in');
        return transitionEnd(this.el!, 1000).then(() => this);
    }


    hide(): PromiseLike<this> {
        this.el!.classList.remove('in');
        return transitionEnd(this.el!, 1000).then(() => this);
    }


}