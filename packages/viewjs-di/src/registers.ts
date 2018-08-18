import { IContainer } from './common';

/**
* Used to allow functions/classes to indicate that they should be registered as transients with the container.
*
* @class TransientRegistration
* @constructor
* @param {Object} [key] The key to register as.
*/
export class TransientRegistration {
    key: any
    constructor(key: any) {
        this.key = key;
    }

    /**
    * Called by the container to register the annotated function/class as transient.
    *
    * @method register
    * @param {Container} container The container to register with.
    * @param {Object} key The key to register as.
    * @param {Object} fn The function to register (target of the annotation).
    */
    register(container: IContainer, key: any, fn: Function): void {
        container.registerTransient(this.key || key, fn);
    }
}

/**
* Used to allow functions/classes to indicate that they should be registered as singletons with the container.
*
* @class SingletonRegistration
* @constructor
* @param {Object} [key] The key to register as.
*/
export class SingletonRegistration {
    registerInChild: boolean
    key: any
    constructor(keyOrRegisterInChild: any, registerInChild: boolean = false) {
        if (typeof keyOrRegisterInChild === 'boolean') {
            this.registerInChild = keyOrRegisterInChild;
        } else {
            this.key = keyOrRegisterInChild;
            this.registerInChild = registerInChild;
        }
    }

    /**
    * Called by the container to register the annotated function/class as a singleton.
    *
    * @method register
    * @param {Container} container The container to register with.
    * @param {Object} key The key to register as.
    * @param {Object} fn The function to register (target of the annotation).
    */
    register(container: IContainer, key: any, fn: Function): void {
        var destination = this.registerInChild ? container : container.root;
        destination!.registerSingleton(this.key || key, fn);
    }
}