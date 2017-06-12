import { Controller, view } from './controller';
import { View } from './template-view'
import { autoinject } from 'slick-di'

class Rapper {

}

@autoinject
export class TestView extends View<HTMLDivElement> {
    template(data: any = {}) {
        return `<h1>Hello, ${data.what}!</h1>`
    }

    data() {
        return { what: 'World' }
    }

    constructor(rapper: Rapper) {
        super();
        console.log(rapper)
    }
}

export class TestController extends Controller<Element> {

    @view('.view1')
    view1: TestView;

}