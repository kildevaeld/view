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
            container
                .on('attach', this.viewDidAttach, this)
                .on('render', this.viewDidRender, this)
                .on('unmount', this.viewDidUnmount, this);

            this._attachments.push(container);

            if (this._rendered) {
                container.render();
            }

            return this;
        }

        unAttachView(name: string) {
            const found = this._attachments.findIndex(m => m.options.name === name);
            if (found != -1) {
                this._attachments[found].destroy();
                this._attachments.splice(found, 1);
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

        viewDidAttach(_name: string, _view: IView) { }

        viewDidRender(_name: string, _view: IView) { }

        viewDidUnmount(_name: string, _view: IView) { }

        protected renderAttachments() {
            for (let i = 0, ii = this._attachments.length; i < ii; i++) {
                this._attachments[i].render();
            }
        }

        destroy() {
            this._attachments.forEach(m => m.destroy());
            this._attachments.length = 0;
            return super.destroy();
        }


    };
}