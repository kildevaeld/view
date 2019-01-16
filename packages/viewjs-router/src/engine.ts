import { Middleware } from './types';
import { Context } from './context';
import { isString, isFunction, debug as Debug } from '@viewjs/utils';
import { Route, ParameterMiddleware, RouteOptions } from './route';
import { compose } from './compose';
import { ParseOptions, RegExpOptions } from 'path-to-regexp';

const debug = Debug('viewjs:router:router');

export interface EngineOptions extends ParseOptions, RegExpOptions {
    prefix?: string;
    routerPath?: string;
}

export interface RouterMiddleware<C extends Context> {
    (context: C, next: () => any): any
    router?: Engine<C>;
}


export class Engine<ContextType extends Context> {
    stack: Route<ContextType>[] = [];
    params: { [key: string]: ParameterMiddleware<ContextType> } = {}
    constructor(public options: EngineOptions = {}) { }

    use(pathOrPathsOrMiddleware: string | string[] | RouterMiddleware<ContextType>, ...rest: RouterMiddleware<ContextType>[]) {

        let path: string | undefined;

        if (Array.isArray(pathOrPathsOrMiddleware) && typeof isString(pathOrPathsOrMiddleware[0])) {
            pathOrPathsOrMiddleware.forEach(m => this.use(m, ...rest));
            return this;
        } else if (isString(pathOrPathsOrMiddleware)) {
            path = pathOrPathsOrMiddleware;
        } else if (isFunction(pathOrPathsOrMiddleware)) {
            rest = [pathOrPathsOrMiddleware].concat(rest);
        }

        rest.forEach(m => {
            if (m.router) {
                m.router.stack.forEach(nestedLayer => {
                    if (path) nestedLayer.setPrefix(path);
                    if (this.options.prefix) nestedLayer.setPrefix(this.options.prefix);
                    this.stack.push(nestedLayer);
                });

                if (this.params) {
                    Object.keys(this.params).forEach((key) => {
                        m.router!.param(key, this.params[key]);
                    });
                }
            } else {
                this.register(path || '(.*)', m, {
                    end: false,
                    ignoreCaptures: !path
                });
            }
        });

        return this;
    }

    prefix(prefix: string) {
        prefix = prefix.replace(/\/$/, '');

        this.options.prefix = prefix;

        this.stack.forEach(function (route) {
            route.setPrefix(prefix);
        });

        return this;
    }


    middleware() {
        var router = this;

        var dispatch: RouterMiddleware<ContextType> = function dispatch(ctx, next) {
            debug('inbound: %s', ctx.path);

            var path = router.options.routerPath || (ctx as any).routerPath || ctx.path;

            var matched = router.match(path);
            var layerChain;

            if ((ctx as any).matched) {
                (ctx as any).matched.push.apply((ctx as any).matched, matched.path);
            } else {
                (ctx as any).matched = matched.path;
            }

            (ctx as any).router = router;

            if (!matched.route) return next();

            var matchedLayers = matched.path
            var mostSpecificLayer = matchedLayers[matchedLayers.length - 1];
            (ctx as any)._matchedRoute = mostSpecificLayer.path;
            if (mostSpecificLayer.name) {
                (ctx as any)._matchedRouteName = mostSpecificLayer.name;
            }

            layerChain = matchedLayers.reduce(function (memo, layer) {
                memo.push(function (ctx: ContextType, next: any) {
                    (ctx as any).captures = layer.captures(path); //, ctx.captures);
                    ctx.params = layer.params(path, (ctx as any).captures, ctx.params);
                    (ctx as any).routerName = layer.name;
                    return next();
                });
                return memo.concat(layer.stack);
            }, [] as Middleware<ContextType>[]);

            return compose(layerChain)(ctx, next);
        };

        dispatch.router = this;

        return dispatch;
    }


    register(path: string | string[], middleware: RouterMiddleware<ContextType> | RouterMiddleware<ContextType>[], opts: RouteOptions) {
        opts = opts || {};

        // support array of paths
        if (Array.isArray(path)) {
            path.forEach((p) => this.register(p, middleware, opts));
            return this;
        }

        // create route
        var route = new Route<ContextType>(path, middleware, {
            end: opts.end === false ? opts.end : true,
            name: opts.name,
            sensitive: opts.sensitive || this.options.sensitive || false,
            strict: opts.strict || this.options.strict || false,
            prefix: opts.prefix || this.options.prefix || "",
            ignoreCaptures: opts.ignoreCaptures
        });

        if (this.options.prefix) {
            route.setPrefix(this.options.prefix);
        }

        // add parameter middleware
        Object.keys(this.params).forEach((param) => {
            route.param(param, this.params[param]);
        });

        this.stack.push(route);

        return route;
    }

    route(name: string): Route<ContextType> | undefined {
        var routes = this.stack;

        for (var len = routes.length, i = 0; i < len; i++) {
            if (routes[i].name && routes[i].name === name) {
                return routes[i];
            }
        }

        return void 0;
    }


    url(name: string, _params: { [key: string]: any }) {
        var route = this.route(name);

        if (route) {
            var args = Array.prototype.slice.call(arguments, 1);
            return route.url.apply(route, args as any);
        }

        return new Error("No route found for name: " + name);
    }

    match(path: string) {
        var layers = this.stack;
        var layer;
        var matched: { path: Route<ContextType>[]; route: boolean } = {
            path: [],
            //pathAndMethod: [],
            route: false
        };

        for (var len = layers.length, i = 0; i < len; i++) {
            layer = layers[i];

            debug('test %s %s', layer.path, layer.regexp);

            if (layer.match(path)) {
                matched.path.push(layer);
                matched.route = true;
            }
        }
        return matched;
    }

    param(param: string, middleware: ParameterMiddleware<ContextType>) {
        this.params[param] = middleware;
        this.stack.forEach(function (route) {
            route.param(param, middleware);
        });
        return this;
    }



}