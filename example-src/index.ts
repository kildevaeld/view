import { BaseView, attributes, withTemplate, Constructor, IViewTemplate, UIMap } from '../lib';

export interface Todo {
    name: string;
}

export interface Model {
    todos: Todo[]
}


export class View extends withTemplate<Constructor<BaseView>, Model>(BaseView) {
    template = (data: Model) => (`<ul>
       <h1>Hello, World</h1>
    </ul>`);
}


