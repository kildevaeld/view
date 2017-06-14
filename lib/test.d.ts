import { ViewController } from './controller';
import { View } from './view';
import { DelegateEvent } from './base-view';
import { ArrayCollection, CollectionView } from './collection-view';
export declare class Rapper {
    id: string;
}
export interface Model {
    name: string;
    id: number;
}
export declare class ChildView extends View {
    data: Model;
    template: (data: Model) => string;
    render(): this;
}
export declare class List extends CollectionView<Model, ChildView> {
    childView: typeof ChildView;
    collection: ArrayCollection<Model>;
    constructor(rapper: Rapper);
    onClick(e: DelegateEvent): void;
}
declare const TestView_base: typeof View;
export declare class TestView extends TestView_base {
    template(data?: any): string;
    data(): {
        what: string;
    };
    onHeaderClicked(e: MouseEvent): void;
    constructor(rapper: Rapper);
}
export declare class TestController extends ViewController {
    protected view1: TestView;
    protected list: List;
    constructor();
}
