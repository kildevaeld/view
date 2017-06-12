import { ViewController } from './controller';
import { view } from './mixins';
import { View } from './view';
import { autoinject } from 'slick-di'
import {attributes} from './decorators'
export class Rapper {

}

@autoinject
@attributes({

})
export class TestView extends View {


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

export class TestController extends ViewController {

    @view('.view1')
    protected view1: TestView;

    constructor() {
        super();
    }

}

/*
import { View } from './view';
import { ViewMountable, view } from './mixins'
class TestView extends ViewMountable(View) {

    @view('.view1')
    view1: View

}*/