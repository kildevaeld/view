import { event, View, attributes, withTemplate, Constructor, IViewTemplate, UIMap, attach, withAttachedViews, IViewAttachable } from '../lib';

export interface Todo {
    name: string;
}

export interface Model {
    todos: Todo[]
}

export class TestView extends withTemplate(View) {
    template = () => (`
        <h4>You tube</h4>
    `)
}


export class MainView extends withAttachedViews(withTemplate<Constructor<View>, Model>(View)) {
    template = (data: Model) => (`<ul>
       <h1>Hello, World</h1>
       <div class="test"></div>
    </ul>`);

    @attach('.test')
    test: TestView;



    @event.click('.test')
    rapper() {

    }

    @event.click('.ara')
    rapper2(e: MouseEvent) {

    }

}


