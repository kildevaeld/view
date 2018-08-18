import { HistoryAPI, PathChangeEvent, HistoryProvider, NavigateOptions } from './history';
import { Engine, RouterMiddleware } from './engine';
import { TypedEventEmitter, withEventListener, IEventListener, Observer } from '@viewjs/events';
import { Middleware } from './types';
import { Context } from './context';

var _shared: Router<Context> | undefined;

export class Router<ContextType extends Context = Context> extends withEventListener(TypedEventEmitter) implements IEventListener {

    static create(root: string = window.location.pathname, kind?: HistoryProvider) {
        if (typeof kind === 'undefined') {
            kind = 'pushState' in window.history ? HistoryProvider.Push : HistoryProvider.Fragment;
        }
        return new Router(new HistoryAPI(kind, root));
    }


    private engine: Engine<ContextType>;
    private dispatch?: Middleware<ContextType>
    private _else?: (ctx: ContextType) => any;

    constructor(public history: HistoryAPI) {
        super();
        this.engine = new Engine;
        this.listenTo(this.history, PathChangeEvent, this._onPathChange);
    }

    use(pathOrPathsOrMiddleware: string | string[] | RouterMiddleware<ContextType>, ...rest: RouterMiddleware<ContextType>[]) {
        this.engine.use(pathOrPathsOrMiddleware, ...rest);
        this.dispatch = void 0;
        return this;
    }

    else(fn: (ctx: ContextType) => any) {
        this._else = fn;
        return this;
    }

    navigate(path: string, options: NavigateOptions = { trigger: true }) {
        this.history.navigate(path, options);
        return this;
    }

    private _onPathChange(event: PathChangeEvent) {
        if (!this.dispatch) {
            this.dispatch = this.engine.middleware();
        }

        const ctx = this.createContext(event);

        if (ctx.path == '') ctx.path = '/';

        this.dispatch(ctx, () => {
            this._else && this._else(ctx);
        });
    }

    static get shared() {
        if (!_shared) {
            _shared = Router.create();
        }
        return _shared!;
    }

    protected createContext(event: PathChangeEvent): ContextType {
        return {
            path: event.value.startsWith('/') ? event.value.substr(1) : event.value,
            params: {}
        } as ContextType;
    }

}
