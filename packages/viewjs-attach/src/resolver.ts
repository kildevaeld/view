import { isFunction, isObjectLike } from '@viewjs/utils';

export type Resolvable<R, A = any> = R | PromiseLike<R> | ((args?: A) => R | PromiseLike<R>);

export function resolve<T>(r: Resolvable<T>, args?: any): PromiseLike<T> {
    const resolved = isFunction(r) ? r(args) : r;
    if (isPromise<T>(resolved)) {
        return resolved;
    }
    return Promise.resolve(resolved);
}

export function isPromise<T>(a: any): a is PromiseLike<T> {
    return a &&
        isObjectLike(a) &&
        isFunction((a as any).then) &&
        isFunction((a as any).catch)
}


export interface Deferred<T> {
    promise: Promise<T>;
    resolve: (r: T | PromiseLike<T> | undefined) => void;
    reject: (e: Error) => void;
}

export function deferred<T>(): Deferred<T> {
    let resolve, reject, promise = new Promise<T>((rs, rj) => {
        resolve = rs;
        reject = rj;
    });

    return { promise, resolve, reject } as any;
}


const enum State {
    Unresolved, Resolving, Resolved, Error
}

export class Resolver<T> {
    private _error: Error | undefined;
    private _value: T | undefined;
    private _state: State = State.Unresolved;
    private _queue: Deferred<T>[] = [];

    constructor(private _resolvable: Resolvable<T>) { }

    resolve(): PromiseLike<T> {
        switch (this._state) {
            case State.Resolved:
                return Promise.resolve(this._value!);
            case State.Error:
                return Promise.reject(this._error);
            case State.Resolving: {
                const defer = deferred<T>();
                this._queue.push(defer);
                return defer.promise;
            }
            case State.Unresolved: {
                const defer = deferred<T>();
                this._queue.push(defer);
                this._resolve();
                return defer.promise;
            };
        }
    }

    private _resolve() {
        this._value = void 0;
        this._error = void 0;

        const cb = (reject: boolean, val: any) => this._queue.forEach(d => {
            (d as any)[reject ? 'reject' : 'resolve'](val);
        });

        return resolve(this._resolvable)
            .then(resolved => {
                this._value = resolved;
                cb(false, this._value);
            }, err => {
                this._error = err;
                cb(true, this._error);
            });
    }
}