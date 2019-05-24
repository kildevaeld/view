import { Deferred, resolve, deferred, Resolvable } from '@viewjs/utils';

const enum State {
    Unresolved, Resolving, Resolved, Error
}

export class Resolver<T, A = any> {
    private _error: Error | undefined;
    private _value: T | undefined;
    private _state: State = State.Unresolved;
    private _queue: Deferred<T>[] = [];

    constructor(private _resolvable: Resolvable<T, A>) { }

    resolve(args?: A): PromiseLike<T> {
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
                this._resolve(args);
                return defer.promise;
            };
        }
    }

    private _resolve(args?: A) {
        this._value = void 0;
        this._error = void 0;

        const cb = (reject: boolean, val: any) => this._queue.forEach(d => {
            (d as any)[reject ? 'reject' : 'resolve'](val);
        });

        return resolve(this._resolvable, args)
            .then(resolved => {
                this._value = resolved;
                cb(false, this._value);
            }, err => {
                this._error = err;
                cb(true, this._error);
            });
    }
}