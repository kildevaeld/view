import { ViewController } from './controller';
import { View } from './view';
import { autoinject, Container, singleton } from 'slick-di'
import { attributes, event, view } from './decorators'
import { ViewObservable, ViewMountable } from './mixins';
import { uniqueId } from './utils';
import { ArrayCollection, CollectionView, ICollection } from './collection-view';

@singleton()
export class Rapper {
    id: string = uniqueId();

}

var container = new Container();


ViewMountable.Invoker = container

interface Model {
    name: string;
}


@autoinject
class List extends CollectionView<Model, View> {
    childView = class ChildView extends View {
        template = (data: Model) => `${data.name}`
    };
    collection = ArrayCollection<Model>([
        { name: 'Test 1' }, { name: 'Test 2' }
    ]);

    constructor(rapper: Rapper) {
        super();
        console.log(rapper)
    }
}

@autoinject
@attributes({
    ui: {
        header: 'h1'
    }
})
export class TestView extends ViewObservable(View) {


    template(data: any = {}) {
        return `<h1>Hello, ${data.what}!</h1>`
    }

    data() {
        return { what: 'World' }
    }

    @event.click('@header')
    onHeaderClicked(e: MouseEvent) {
        console.log('Clicked', e);
    }

    constructor(rapper: Rapper) {
        super();
        console.log(rapper)
    }

}

export class TestController extends ViewController {

    @view('.view1')
    protected view1: TestView;

    @view('.view2')
    private view2: List;

    constructor() {
        super();
    }

    render() {
        super.render()
        this.view1.on('*', (event) => {
            console.log(event)
        })
        return this;
    }

}

/*
import { View } from './view';
import { ViewMountable, view } from './mixins'
class TestView extends ViewMountable(View) {

    @view('.view1')
    view1: View

}*/