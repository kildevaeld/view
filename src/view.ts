import { BaseView, BaseViewOptions } from './base-view';

export class View extends BaseView<HTMLElement> {
    readonly options: BaseViewOptions<HTMLElement>;
    constructor(options: BaseViewOptions<HTMLElement> = { attachId: true }) {
        super(options);
    }

}

