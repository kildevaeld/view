import { ViewController } from './controller';
import { View } from './view';
export declare class Rapper {
}
export declare class TestView extends View {
    template(data?: any): string;
    data(): {
        what: string;
    };
    constructor(rapper: Rapper);
}
export declare class TestController extends ViewController {
    protected view1: TestView;
    constructor();
}
