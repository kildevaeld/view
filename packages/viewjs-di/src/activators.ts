import { IActivator } from './common';


/**
* Used to instantiate a class.
*
* @class ClassActivator
* @constructor
*/
export class ClassActivator implements IActivator {
    static instance = new ClassActivator();

    invoke(fn: Function, args: any[]): any {
        return Reflect.construct(fn, args);
    }
}

/**
* Used to invoke a factory method.
*
* @class FactoryActivator
* @constructor
*/
export class FactoryActivator implements IActivator {
    static instance = new FactoryActivator();

    invoke(fn: Function, args: any[]): any {
        return fn.apply(undefined, args);
    }
}

export class AsyncClassActivator implements IActivator {
    static instance = new AsyncClassActivator();

    invoke(fn: Function, args: any[]): any {
        return Promise.all(args).then(args => {
            return Reflect.construct(fn, args);
        })
    }
}