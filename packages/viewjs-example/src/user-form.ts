import { withTemplate } from '@viewjs/view';
import { ValidationView, validations } from '@viewjs/validation';
import { User } from './models';

@validations({
    name: validations.string().required(),
    email: validations.string().email().required()
})
export class UserFormView extends withTemplate(ValidationView) {
    Model = User
    template = `<form class="form">
        <div class="form-field">
            <label for="name">Name</label>
            <input type="text" name="name" />
        </div>
        <div class="form-field">
            <label for="name">Email</label>
            <input type="text" name="email" />
        </div>
    </form>`;
}   