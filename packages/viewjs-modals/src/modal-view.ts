import { withElement, attributes, TemplateView, IView, BaseViewOptions } from '@viewjs/view';
import { withAttachment } from '@viewjs/attach';

export interface ModalViewOptions extends BaseViewOptions<HTMLElement> {
    bodyView: IView;
    model: any;
}


@attributes({
    tagName: 'div',
    className: 'modal-dialog',
    events: {
        'click .modal__close': function (this: ModalView) {
            this.model.requestClose();
        }
    }
})
export class ModalView extends withAttachment(withElement(TemplateView)) {
    template = () => '<button class="modal__close"><span></span><span></span></button><div class="modal__body"></div>';

    constructor(options: ModalViewOptions) {
        super(options);
        this.attachView({
            selector: '.modal__body',
            view: options.bodyView,
            name: 'body'
        });
    }

    set zIndex(idx: number) {
        this.el!.style.zIndex = idx + '';
    }

    get zIndex(): number {
        return parseInt(this.el!.style.zIndex || '0');
    }

}

