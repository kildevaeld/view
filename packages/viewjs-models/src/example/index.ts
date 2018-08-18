import { Model } from '../model';
import { property } from '../decorators';

class Todo extends Model {
    static idAttribute = "uid";

    @property uid?: string;
    @property name?: string;

}

let todo = new Todo({
    uid: 'test',
    name: 'test name'
});

console.log(todo)


