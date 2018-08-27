

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

