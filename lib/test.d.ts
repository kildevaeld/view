import { Controller } from './controller';
import { IViewMountable } from './mixins';
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
declare const TestController_base: (new (...args: any[]) => IViewMountable) & typeof Controller;
export declare class TestController extends TestController_base implements IViewMountable {
    protected view1: TestView;
    constructor();
}
