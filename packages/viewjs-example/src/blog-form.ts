import { withTemplate, event } from '@viewjs/view';
import { ValidationView, validations, ValidationErrors } from '@viewjs/validation';
import { BlogCollection, BlogEntry } from './models';
import { global } from '@viewjs/di';
import { uniqueId } from '@viewjs/utils';
import { injectProp } from './utils';
import { AppRouter } from './routes';

@validations({
    '[name="title"]': validations.string("title").required(),
    '[name="body"]': validations.string("body").required()
})
export class BlogFormView extends withTemplate(ValidationView) {
    model = new BlogEntry({ id: uniqueId() })
    template = `<form>
        <div class="form-field">
            <label for="title">Title</label>
            <input type="text" name="title" required />
        </div>
        <div class="form-field">
            <label for="body">Body</label>
            <input type="text" name="body" required/>
        </div>
    </form>
    <button class="save">Save</button>
    `;

    @injectProp
    collection!: BlogCollection;

    @event.click('button.save', function (this: BlogFormView, e: [MouseEvent]) {
        return this.isValid();
    })
    onSave() {
        this.collection.push(this.model);
        this.collection.save()
        global().get<AppRouter>(AppRouter).router.navigate('/');
    }

    setValidationError(target: HTMLElement, errors: ValidationErrors) {
        console.log(errors);
    }

}