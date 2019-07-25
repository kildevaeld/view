import { ModalView } from './modal-view';
import { Resolvable, uniqueId } from '@viewjs/utils';
import { IView, IRenderer } from '@viewjs/view';
import { transitionEnd, delay } from './support';
import { Modal, ModalOptions, ModalTriggerOptions } from './modal';
import { EventEmitter } from '@viewjs/events';

const MODAL_BACKDROP_INDEX = 1095;
const MODAL_Z_INDEX = 1100;

export type ModalID = string;

export const enum ModalState {
    Closed, Opening, Open, Closing, Accepted
}

interface ModalPair {
    id: ModalID;
    modal: Modal;
    options: ModalOptions;
}

/**
 * ModalManager manages a stack of modals
 *
 * @export
 * @class ModalManager
 */
export class ModalManager {

    private _emitter = new EventEmitter();

    constructor() {
        this._onKeyPress = this._onKeyPress.bind(this);
    }

    private _backdropEl?: HTMLDivElement;

    stack: ModalPair[] = [];

    /**
     * Open a modal
     *
     * @param {(Resolvable<IRenderer | IView | string | ModalView>)} modal
     * @param {ModalOptions} [options={}]
     * @returns {PromiseLike<ModalID>}
     * @memberof ModalManager
     */
    open(modal: Resolvable<IRenderer | IView | string | ModalView, ModalTriggerOptions>, options: ModalOptions = {}): PromiseLike<ModalID> {

        if (!this.stack.length) {
            document.addEventListener('keydown', this._onKeyPress);
            document.body.classList.add('modal-open');
        }

        const id = uniqueId("modal-");

        return Modal.create(modal, Object.assign({
            requestClose: () => this.close(id, false),
            requestAccept: () => this.close(id, true),
        }, options)).then(view => {

            view.el!.style.zIndex = MODAL_Z_INDEX + this.stack.length + '';
            view.el!.setAttribute('data-modal-id', id);

            this.stack.push({
                modal: view,
                id: id,
                options: options
            });

            this._createBackdrop();

            this._getContainer().appendChild(view.render().el!);

            return delay().then(() => {
                this._backdropEl!.classList.add('in');

                return Promise.all([
                    view.show(),
                    transitionEnd(this._backdropEl!, 400)
                ])
            }).then(() => id);
        });

    }

    /**
     * Pop the top-most modal from the stack
     *
     * @returns
     * @memberof ModalManager
     */
    pop(accept: boolean) {
        if (!this.stack.length) return;
        let last = this.stack[this.stack.length - 1];
        return this.close(last.id, accept);
    }

    /**
     * Close a modal by modalId
     *
     * @param {ModalID} modalId
     * @returns
     * @memberof ModalManager
     */
    close(modalId: ModalID, accept: boolean): Promise<void> {
        let found = this.stack.findIndex(m => m.id == modalId);
        if (found == -1) return Promise.resolve();

        let pair = this.stack[found];
        this.stack.splice(found, 1);

        let promises = [];

        this._emitter.trigger(modalId, ModalState.Closing);

        if (!this.stack.length) {
            document.removeEventListener('keydown', this._onKeyPress);
            document.body.classList.remove('modal-open')
            promises.push(transitionEnd(this._backdropEl!, 400));
            this._backdropEl!.classList.remove('in');

        } else promises.push(Promise.resolve());

        promises.push(pair.modal.hide());

        return Promise.all(promises).then((rets) => {
            if (rets[0] && rets[0].target) {
                rets[0].target.remove();
            }

            rets[1].remove().destroy();

            this._emitter
                .trigger(modalId, accept ? ModalState.Accepted : ModalState.Closing)
                .off(modalId);
        });

    }

    listen(id: ModalID, listener: (state: ModalState) => any, ctx?: any) {
        if (!this._getModal(id)) return this;
        this._emitter.on(id, listener, ctx);
        return this;
    }


    private _createBackdrop() {
        if (this._backdropEl) {
            document.body.appendChild(this._backdropEl);
            return this._backdropEl;
        }

        this._backdropEl = document.createElement('div');
        this._backdropEl.classList.add('modal__backdrop');
        this._backdropEl.classList.add('fade');

        this._backdropEl.style.zIndex = MODAL_BACKDROP_INDEX + '';

        document.body.appendChild(this._backdropEl);

        return this._backdropEl;
    }


    private _getContainer() {
        return document.body;
    }


    private _onKeyPress(e: KeyboardEvent) {
        if (e.keyCode !== 27) return;
        if (this.stack.length == 0 || !this.stack[this.stack.length - 1].options.closeOnEscape) return;
        this.pop(false);
    }

    private _getModal(id: ModalID) {
        return this.stack.find(m => m.id == id)
    }


}

export const Modals = new ModalManager();