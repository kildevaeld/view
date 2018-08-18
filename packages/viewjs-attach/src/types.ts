import { IRenderer, IView } from '@viewjs/view';
import { Constructor, Condition } from '@viewjs/types'
import { Resolvable } from './resolver';

export interface IAttachmentContainer {
    getInstance<T extends IView>(): T;
}

export interface AttachOptions {
    view: Resolvable<IView>
    optional?: boolean;
    selector: string;
    name: string;
    condition?: Condition<IView>
}

export interface IComponentView {

    attachView(name: string): IAttachmentContainer | undefined;
    attachView(options: AttachOptions): this;
    ///attachView(selector: string, name: string, container: IAttachmentContainer): this;

}