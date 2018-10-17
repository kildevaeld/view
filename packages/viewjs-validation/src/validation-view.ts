import { View, BaseViewOptions } from '@viewjs/view';
import { ValidationErrors } from './validator';
import { withValidationView, IValidationView } from './with-validation';
import { withBindings, IBindableView } from '@viewjs/bind';
import { withModel, IModelController, IModel } from '@viewjs/models';
import { Constructor } from '@viewjs/utils';


export interface ValidationViewOptions extends BaseViewOptions<HTMLElement> {
    errorClass?: string;
    showErrorMessage?: boolean;
    errorMessageClass?: string;
}


export class ValidationView extends withValidationView(withBindings(withModel<Constructor<View<HTMLElement, ValidationViewOptions>>, IModel>(View)), { event: 'keyup' }) implements IBindableView, IModelController<IModel>, IValidationView {

    constructor(options?: ValidationViewOptions) {
        super(Object.assign({
            errorMessageClass: 'input-message',
            errorClass: 'has-error',
            showErrorMessage: true,
            bindingAttribute: 'name'
        }, options || {}));

    }

    setValidationError(target: HTMLElement, errors: ValidationErrors) {

        if (target != document.activeElement) {
            // Only show new errors in active element
            return;
        }

        const container = target.parentElement!

        if (this.options.showErrorMessage) {
            let msg = container.querySelector('.' + this.options.errorMessageClass!);

            const text = this._getErrorMessage(errors);

            if (!msg) {
                msg = document.createElement('div');
                msg.classList.add(this.options.errorMessageClass!);
                container.appendChild(msg);

            }

            msg.innerHTML = text;

            msg.classList.remove('hidden');

        }

        container.classList.add(this.options.errorClass!);

        //triggerMethodOn(this, 'valid', false);

    }

    clearValidationError(target: HTMLElement) {
        const container = target.parentElement!
        let msg = container.querySelector('.' + this.options.errorMessageClass!);
        if (msg) {
            msg.innerHTML = '';
            msg.classList.add('hidden');
        }
        container.classList.remove(this.options.errorClass!);

        //triggerMethodOn(this, 'valid', this.isValid());

    }


    protected _getErrorMessage(errors: ValidationErrors) {
        return errors.errors.map(m => {
            return m.message;
        }).join('<br/>');
    }

}