import { ViewController } from './controller';
import { View } from './view';
export declare class Rapper {
    id: string;
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
    private view2;
    constructor();
    render(): this;
}
