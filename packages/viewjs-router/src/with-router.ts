import { IView, View, BaseViewOptions } from '@viewjs/view';
import { isFunction } from '@viewjs/utils';
import { Constructor } from '@viewjs/types';
import { Router } from './router';
import { Middleware } from './types';
import { Context } from './context';
import { Region } from './region';

export interface IRouterView<ContextType extends Context = Context> {
    readonly router: Router<ContextType>;
    registerRoute(path: string, defintion: RouteDefinition<ContextType> | ViewFactory<ContextType>, middlewares?: Middleware<ContextType>[]): this;
    notFound(defintion: RouteDefinition<ContextType> | ViewFactory<ContextType>): this;
}

export interface IRouterViewOptions<ContextType extends Context> {
    destination?: string;
    router?: RouterFactory<ContextType>;
    selector?: string;
}

export type IRouterViewConstructor<ContextType extends Context> = new (options?: IRouterViewOptions<ContextType>) => IRouterView;

export type RouterFactory<ContextType extends Context> = Router | ((view: IView) => Router<ContextType>);

export type ViewFactory<ContextType extends Context> = (ctx: ContextType) => IView | PromiseLike<IView>;

export interface RouteDefinition<ContextType extends Context> {
    view: ViewFactory<ContextType>;
}

export interface ITransitioner {
    transition(from: IView | undefined, to: IView, container: HTMLElement): any;
}

export type Transition = ((from: IView | null, to: IView, container: HTMLElement) => any) | ITransitioner;

function resolveRouter<ContextType extends Context>(view: IView, router: RouterFactory<ContextType>): Router<ContextType> {
    return isFunction(router) ? (router as any)(view) : router;
}

export function withRouter<T extends Constructor<IView>, ContextType extends Context = Context>(Base: T, options: IRouterViewOptions<ContextType> = {}, router?: RouterFactory<ContextType>): T & Constructor<IRouterView<ContextType>> {

    return class extends Base {
        private _router: Router<ContextType> | undefined;
        private _region: Region = new Region();

        set transition(transition: Transition | undefined) {
            this._region.transition = transition;
        }
        get transition() {
            return this._region.transition;
        }

        get router(): Router<ContextType> {
            if (this._router) {
                this._router = resolveRouter<ContextType>(this, router!);
                if (!this._router) this._router = Router.shared as any;
            }
            return this._router!;
        }

        get currentView() {
            return this._region.view;
        }

        constructor(...rest: any[]) {
            super(...rest);
        }

        registerRoute(path: string, defintion: RouteDefinition<ContextType> | ViewFactory<ContextType>, middlewares: Middleware<ContextType>[] = []) {
            const md = middlewares.slice()
            md.push((ctx, _next) => this._onRouterChanged(ctx, defintion));
            this.router.use(path, ...md);
            return this;
        }

        notFound(defintion: RouteDefinition<ContextType> | ViewFactory<ContextType>) {
            this.router.else(ctx => this._onRouterChanged(ctx, defintion));
            return this;
        }

        private _onRouterChanged(ctx: ContextType, defintion: RouteDefinition<ContextType> | ViewFactory<ContextType>) {
            if (isFunction(defintion)) {
                defintion = { view: defintion as ViewFactory<ContextType> };
            }

            return Promise.resolve((defintion as RouteDefinition<ContextType>).view(ctx))
                .then(view => {
                    this._resolveContainer();
                    this._region.view = view;
                });
        }

        private _resolveContainer(): HTMLElement | null {
            if (!this.el) return null;

            let el: HTMLElement | undefined = this.el as HTMLElement;


            if (options.destination) {
                el = this.el!.querySelector(options.destination) as HTMLElement;
            }

            if (!el) return null;
            if (el !== this._region.el)
                this._region.el = el;

            return el;
        }

    }
}

export interface RouterViewOptions<ContextType extends Context> extends BaseViewOptions<HTMLElement>, IRouterViewOptions<ContextType> {

}

export class RouterView<ContextType extends Context> extends withRouter<Constructor<View>, any>(View) implements IRouterView<ContextType> {
    private _router?: Router<ContextType>;

    get router(): Router<ContextType> {
        return this._router || Router.shared as any;
    }

    constructor(options?: RouterViewOptions<ContextType>) {
        super(options);
        if (options && options!.router) {
            this._router = resolveRouter(this, options.router!);
        }
    }
}