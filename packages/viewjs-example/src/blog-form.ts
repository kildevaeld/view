import { withTemplate, event } from '@viewjs/view';
import { ValidationView, validations, ValidationErrors } from '@viewjs/validation';
import { BlogCollection, BlogEntry } from './models';
import { global } from '@viewjs/di';
import { uniqueId } from '@viewjs/utils';
import { injectProp } from './utils';
import { AppRouter } from './routes';
import { ui, withUIMap } from '@viewjs/html';



@validations({
    '@titleInput': validations.string("title").required(),
    '@bodyInput': validations.string("body").required()
})
@ui({
    form: 'form',
    saveBtn: 'button.save',
    titleInput: '[name="title"]',
    bodyInput: '[name="body"]'
})
export class BlogFormView extends withUIMap(withTemplate(ValidationView)) {
    model = new BlogEntry({ id: uniqueId() })
    template = `<form>
        <div class="form-field">
            <label for="title">Title</label>
            <input type="text" name="title" bind="title" required />
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

    @event.click('@saveBtn', function (this: BlogFormView, e: [MouseEvent]) {
        this.validate()
        console.log('should save', this.isValid(), this.model)
        return this.isValid();
    })
    onSave() {

        this.collection.push(this.model);
        this.collection.save()
        console.log(this.collection)
        global().get<AppRouter>(AppRouter).router.navigate('/');
    }

    setValidationError(_target: HTMLElement, errors: ValidationErrors) {
        console.log(errors);
    }

}