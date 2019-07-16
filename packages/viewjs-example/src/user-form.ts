import { withTemplate, event } from '@viewjs/view';
import { ValidationView, validations } from '@viewjs/validation';
import { User } from './models';
import { global } from '@viewjs/di';
import { AppRouter } from './routes';


@validations({
    '[name="name"]': validations.string().required(),
    '[name="email"]': validations.string().email().required()
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
    </form>
    <button class="save">Save</button>
    `;

    @event.click('.save', function (this: UserFormView, _e: [MouseEvent]) {

        console.log('should save', this.isValid(), this.validate())
        return this.isValid();
    })
    onSave() {


        global().get<AppRouter>(AppRouter).router.navigate('/');
    }
}   