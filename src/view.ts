import { BaseView, BaseViewOptions } from './base-view';

export interface ViewOptions extends BaseViewOptions<Element> {
    ensureElement?: string;

}

export class View extends BaseView<Element> {
    readonly options: ViewOptions;
    constructor(options: ViewOptions = { attachId: true }) {
        super(options);
    }
}


