import { IContainer } from './common'

/**
* An abstract resolver used to allow functions/classes to specify custom dependency resolution logic.
*
* @class Resolver
* @constructor
*/
export abstract class Resolver {
    /**
    * Called by the container to allow custom resolution of dependencies for a function/class.
    *
    * @method get
    * @param {Container} container The container to resolve from.
    * @return {Object} Returns the resolved object.
    */
    abstract get(container: IContainer): any;
}

/**
* Used to allow functions/classes to specify lazy resolution logic.
*
* @class Lazy
* @constructor
* @extends Resolver
* @param {Object} key The key to lazily resolve.
*/
export class Lazy<T> extends Resolver {
    key: any
    constructor(key: any) {
        super();
        this.key = key;
    }

    /**
    * Called by the container to lazily resolve the dependency into a lazy locator function.
    *
    * @method get
    * @param {Container} container The container to resolve from.
    * @return {Function} Returns a function which can be invoked at a later time to obtain the actual dependency.
    */
    get(container: IContainer): () => T {
        return () => {
            return container.get(this.key) as T;
        };
    }

    /**
    * Creates a Lazy Resolver for the supplied key.
    *
    * @method of
    * @static
    * @param {Object} key The key to lazily resolve.
    * @return {Lazy} Returns an insance of Lazy for the key.
    */
    static of<T = any>(key: any): Lazy<T> {
        return new Lazy(key);
    }
}

/**
* Used to allow functions/classes to specify resolution of all matches to a key.
*
* @class All
* @constructor
* @extends Resolver
* @param {Object} key The key to lazily resolve all matches for.
*/
export class All<T> extends Resolver {
    key: any
    constructor(key: any) {
        super();
        this.key = key;
    }

    /**
    * Called by the container to resolve all matching dependencies as an array of instances.
    *
    * @method get
    * @param {Container} container The container to resolve from.
    * @return {Object[]} Returns an array of all matching instances.
    */
    get(container: IContainer): T[] {
        return container.getAll(this.key);
    }

    /**
    * Creates an All Resolver for the supplied key.
    *
    * @method of
    * @static
    * @param {Object} key The key to resolve all instances for.
    * @return {All} Returns an insance of All for the key.
    */
    static of<T = any>(key: any): All<T> {
        return new All(key);
    }
}

/**
* Used to allow functions/classes to specify an optional dependency, which will be resolved only if already registred with the container.
*
* @class Optional
* @constructor
* @extends Resolver
* @param {Object} key The key to optionally resolve for.
* @param {Boolean} [checkParent=false] Indicates whether or not the parent container hierarchy should be checked.
*/
export class Optional<T> extends Resolver {
    checkParent: boolean
    key: any
    constructor(key: any, checkParent: boolean = false) {
        super();
        this.key = key;
        this.checkParent = checkParent;
    }

    /**
    * Called by the container to provide optional resolution of the key.
    *
    * @method get
    * @param {Container} container The container to resolve from.
    * @return {Object} Returns the instance if found; otherwise null.
    */
    get(container: IContainer): T | null {
        if (container.hasHandler(this.key, this.checkParent)) {
            return container.get(this.key);
        }

        return null;
    }

    /**
    * Creates an Optional Resolver for the supplied key.
    *
    * @method of
    * @static
    * @param {Object} key The key to optionally resolve for.
    * @param {Boolean} [checkParent=false] Indicates whether or not the parent container hierarchy should be checked.
    * @return {Optional} Returns an insance of Optional for the key.
    */
    static of<T = any>(key: any, checkParent: boolean = false): Optional<T> {
        return new Optional(key, checkParent);
    }
}


/**
* Used to inject the dependency from the parent container instead of the current one.
*
* @class Parent
* @constructor
* @extends Resolver
* @param {Object} key The key to resolve from the parent container.
*/
export class Parent<T> extends Resolver {
    key: any
    constructor(key: any) {
        super();
        this.key = key;
    }

    /**
    * Called by the container to load the dependency from the parent container
    *
    * @method get
    * @param {Container} container The container to resolve the parent from.
    * @return {Function} Returns the matching instance from the parent container
    */
    get(container: IContainer): T | null {
        return container.parent
            ? container.parent.get(this.key)
            : null;
    }

    /**
    * Creates a Parent Resolver for the supplied key.
    *
    * @method of
    * @static
    * @param {Object} key The key to resolve.
    * @return {Parent} Returns an insance of Parent for the key.
    */
    static of<T = any>(key: any): Parent<T> {
        return new Parent(key);
    }
}