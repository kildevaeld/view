import { Middleware } from './types';
import { Context } from './context';
import pathToRegExp from 'path-to-regexp';
import { debug as Debug } from '@viewjs/utils';
const debug = Debug("viewjs:router:route");

export type ParameterMiddleware<T> = (params: string, ctx: T, next?: () => any) => any

export interface RouteOptions extends pathToRegExp.ParseOptions, pathToRegExp.RegExpOptions {
    name?: string;
    prefix?: string;
    ignoreCaptures?: boolean;
}

export class Route<ContextType extends Context> {
    stack: Middleware<ContextType>[];
    paramNames: pathToRegExp.Key[] = [];
    regexp: RegExp;
    name: string | undefined;
    constructor(public path: string, middleware: Middleware<ContextType> | Middleware<ContextType>[], public options: RouteOptions = {}) {
        this.stack = Array.isArray(middleware) ? middleware : [middleware];
        this.name = options.name;
        // ensure middleware is a function
        this.stack.forEach((fn) => {
            var type = (typeof fn);
            if (type !== 'function') {
                throw new Error(
                    " `" + (this.options.name || path) + "`: `middleware` " +
                    "must be a function, not `" + type + "`"
                );
            }
        }, this);



        this.path = path.startsWith('/') ? path.substr(1) : path;
        if (this.path == '') this.path = '/';
        this.regexp = pathToRegExp(this.path, this.paramNames, this.options);

        debug('defined route %s', this.options.prefix + this.path);

    }

    match(path: string) {
        if (path.length > 1 && path.startsWith('/')) path = path.substr(1);
        return this.regexp.test(path);
    }

    params(_path: string, captures: string[], existingParams: { [key: string]: string }) {
        var params = existingParams || {};

        for (var len = captures.length, i = 0; i < len; i++) {
            if (this.paramNames[i]) {
                var c = captures[i];
                params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c;
            }
        }

        return params;
    }

    captures(path: string) {
        if (this.options.ignoreCaptures) return [];
        return path.match(this.regexp)!.slice(1);
    }

    /**
     * Generate URL for route using given `params`.
     *
     * @example
     *
     * ```javascript
     * var route = new Layer(['GET'], '/users/:id', fn);
     *
     * route.url({ id: 123 }); // => "/users/123"
     * ```
     *
     * @param {Object} params url parameters
     * @returns {String}
     * @private
     */
    url(params: any, options: any) {
        var args = params;
        var url = this.path.replace(/\(\.\*\)/g, '');
        var toPath = pathToRegExp.compile(url);
        var replaced;

        if (typeof params != 'object') {
            args = Array.prototype.slice.call(arguments);
            if (typeof args[args.length - 1] == 'object') {
                options = args[args.length - 1];
                args = args.slice(0, args.length - 1);
            }
        }

        var tokens = pathToRegExp.parse(url);
        var replace: { [key: string]: string } = {};

        if (args instanceof Array) {
            for (var len = tokens.length, i = 0, j = 0; i < len; i++) {
                if ((tokens[i] as any).name) replace[(tokens[i] as any).name] = args[j++];
            }
        } else if (tokens.some(token => (token as any).name)) {
            replace = params;
        } else {
            options = params;
        }

        replaced = toPath(replace);

        if (options && options.query) {
            // var replaced = new uri(replaced)
            // replaced.search(options.query);
            // return replaced.toString();
        }

        return replaced;
    }


    /**
     * Run validations on route named parameters.
     *
     * @example
     *
     * ```javascript
     * router
     *   .param('user', function (id, ctx, next) {
     *     ctx.user = users[id];
     *     if (!user) return ctx.status = 404;
     *     next();
     *   })
     *   .get('/users/:user', function (ctx, next) {
     *     ctx.body = ctx.user;
     *   });
     * ```
     *
     * @param {String} param
     * @param {Function} middleware
     * @returns {Layer}
     * @private
     */
    param(param: string, fn: ParameterMiddleware<ContextType>) {
        var stack = this.stack;
        var params = this.paramNames;
        var middleware = function (this: any, ctx: ContextType, next?: () => any) {
            return fn.call(this, ctx.params[param], ctx, next);
        };
        (middleware as any).param = param;

        var names = params.map(function (p) {
            return p.name;
        });

        var x = names.indexOf(param);
        if (x > -1) {
            // iterate through the stack, to figure out where to place the handler fn
            stack.some((fn, i) => {
                // param handlers are always first, so when we find an fn w/o a param property, stop here
                // if the param handler at this part of the stack comes after the one we are adding, stop here
                if (!(fn as any).param || names.indexOf((fn as any).param) > x) {
                    // inject this param handler right before the current item
                    stack.splice(i, 0, middleware);
                    return true; // then break the loop
                }
                return false;
            });
        }

        return this;
    }

    setPrefix(prefix: string) {
        if (this.path) {
            this.path = prefix + this.path;
            this.paramNames = [];
            this.regexp = pathToRegExp(this.path, this.paramNames, this.options);
        }

        return this;
    }

}


function safeDecodeURIComponent(text: string) {
    try {
        return decodeURIComponent(text);
    } catch (e) {
        return text;
    }
}