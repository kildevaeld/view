import { BaseView, BaseViewOptions } from './base-view';

export class View extends BaseView<HTMLElement> {

    constructor(options: BaseViewOptions<HTMLElement> = { attachId: true }) {
        super(options);
    }

}

