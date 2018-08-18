import { View, event, withTemplate, withAttachedViews, withElement, attach } from '../index';

interface Todo {
    name: string;
}

interface Todos {
    todos: Todo[];
}

class TodoList extends withTemplate(View) {
    model: Todos = { todos: [] }
    template = (model: Todos) => model.todos.map(m => {
        return `<li>${m.name}</li>`
    }).join('')
}

class TodoPage extends withAttachedViews(withTemplate(withElement(View))) {
    template = () => `
        <button>Create</button>
        <ul class="list"></ul>
    `
    @attach('.list')
    list: TodoList;

    @event.click('button')
    onclick() {
        this.list.model.todos.push({ name: "New Todo" })
        this.render();
    }
}

const Base = TodoPage.inherit({
    constructor() {
        Base.__super__.constructor.call(this);
    },
    onclick() {
        console.log('Hello, World');
        Base.__super__.onclick.call(this);
    },

});


const page = new Base().render();

window.onload = () => document.body.appendChild(page.el!)


