import { Model, decorators, ModelCollection } from '@viewjs/models';
import { singleton } from '@viewjs/di';

export class User extends Model {
    @decorators.property
    name?: string;

    @decorators.property
    email?: string;

}

export class BlogEntry extends Model {
    @decorators.property
    title!: string;

    @decorators.property
    body!: string;
}

@singleton()
export class BlogCollection extends ModelCollection<BlogEntry> {
    Model = BlogEntry;

    load() {
        const data = localStorage.getItem('todos')!
        try {
            const json = JSON.parse(data)
            this.reset(json);
        } catch (e) { }
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.toJSON()));
    }

};