import { Controller, IView } from '@viewjs/view';
import { isFunction } from '@viewjs/utils';

export interface ITransitioner {
    transition(from: IView | undefined, to: IView, container: HTMLElement): any;
}

export type Transition = ((from: IView | null, to: IView, container: HTMLElement) => any) | ITransitioner;

export class Region extends Controller {
    private _view: IView | undefined;

    transition?: Transition;

    get view() {
        return this._view;
    }

    set view(view: IView | undefined) {
        this.setView(view);
    }


    protected setView(view: IView | undefined) {
        if (view === this.view) return this;
        if (this._view && !view) {
            this._view.destroy();
            this._view = void 0;
            return;
        }

        if (!this.el) {
            return;
        }

        this.switchView(this._view, view!, this.el);

    }

    protected setElement(el: HTMLElement | undefined) {
        if (this.el) {
            this.el.innerHTML = '';
        }

        if (el && this.view) {
            this.switchView(void 0, this.view, el);
        }
        return super.setElement(el);
    }

    protected switchView(from: IView | undefined, to: IView, container: HTMLElement) {
        const remove = () => from && from.el && from.el.parentElement && from.el.parentElement.removeChild(from.el)

        if (!to.el) {
            to.el = document.createElement('div');
        }

        if (this.transition)
            return Promise.resolve(this._resolveTransition()!.transition(from, to, container))
                .then(() => {
                    remove();
                    this._view = to;
                });
        if (from) {
            remove();
            from.destroy();
        }

        container.appendChild(to.el);
        this._view = to.render();
    }

    private _resolveTransition(): ITransitioner | undefined {
        return isFunction(this.transition) ? { transition: this.transition } : this.transition as any;
    }




}