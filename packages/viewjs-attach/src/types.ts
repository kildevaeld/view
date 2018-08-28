import { IView } from '@viewjs/view';
import { Condition, Resolvable } from '@viewjs/types'

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