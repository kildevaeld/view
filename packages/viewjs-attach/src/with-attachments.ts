import { Constructor } from '@viewjs/types';
import { IView } from '@viewjs/view';
import { IComponentView, IAttachmentContainer, AttachOptions } from './types';
import { isString } from '@viewjs/utils';
import { ViewContainer } from './view-container';
import { componentFromMeta } from './decorators';

export function withAttachment<T extends Constructor<IView>>(Base: T): T & Constructor<IComponentView> {
    return class extends Base implements IComponentView {

        private _attachments: ViewContainer[] = [];
        private _rendered: boolean = false;

        constructor(...args: any[]) {
            super(...args);
            componentFromMeta(this).forEach(this.attachView, this);
        }

        attachView(name: string): IAttachmentContainer;
        attachView(options: AttachOptions): this
        attachView(options: string | AttachOptions): any {


            if (isString(options)) {
                return this._attachments.find(m => m.options.name === options);
            }

            const found = this._attachments.find(m => m.options.name === options.name);
            if (found) throw new Error('already attached container with name: ' + name!);


            const container = new ViewContainer(this, options);

            this._attachments.push(container);

            if (this._rendered) {
                container.render();
            }

            return this;
        }

        render() {
            this._rendered = false;
            super.render();
            this.renderAttachments();
            this._rendered = true;
            return this;
        }


        protected renderAttachments() {
            for (let i = 0, ii = this._attachments.length; i < ii; i++) {
                this._attachments[i].render();
            }
        }

    };
}