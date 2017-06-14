import { ViewController } from './controller';
import { View } from './view';
import { autoinject, Container, singleton } from 'slick-di'
import { attributes, event, view } from './decorators'
import { ViewObservable, ViewMountable } from './mixins';
import { uniqueId } from './utils';
import { DelegateEvent } from './base-view';
import { ArrayCollection, CollectionView } from './collection-view';

@singleton()
export class Rapper {
    id: string = uniqueId();

}

var container = new Container();


ViewMountable.Invoker = container

export interface Model {
    name: string;
    id: number;
}

export class ChildView extends View {
    data: Model;
    template = (data: Model) => `${data.name}`
    render() {
        super.render()
        this.el!.setAttribute('data-id', this.data.id + '');
        this.el!.classList.add('item')
        return this
    }

};
@autoinject
export class List extends CollectionView<Model, ChildView> {
    childView = ChildView
    collection = new ArrayCollection<Model>([
        { name: 'Test 1', id: 1 }, { name: 'Test 2', id: 2 }
    ]);

    constructor(rapper: Rapper) {
        super();
        console.log(rapper)

    }

    @event.click('.item')
    onClick(e: DelegateEvent) {
        let id = (e.delegateTarget as Element).getAttribute('data-id');
        let m = this.collection.find(m => {
            return m.id == parseInt(id!);
        });
        this.collection.remove(this.collection.indexOf(m!));
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
    protected list: List;

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