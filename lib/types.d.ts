export interface EventHandler {
    (...args: any[]): void;
}
export interface Event {
    name: string;
    once: boolean;
    handler: EventHandler;
    ctx?: any;
}
/**
 *
 *
 * @export
 * @interface IEventEmitter
 */
export interface IEventEmitter {
    /**
     *
     *
     * @type {{ [key: string]: Events[] }}
     * @memberOf IEventEmitter
     */
    listeners?: Map<any, Event[]>;
    /**
     *
     *
     * @type {string}
     * @memberOf IEventEmitter
     */
    listenId?: string;
    /**
     *
     *
     * @param {string} event
     * @param {EventHandler} fn
     * @param {*} [ctx]
     * @returns {*}
     *
     * @memberOf IEventEmitter
     */
    on(event: string, fn: EventHandler, ctx?: any): any;
    /**
     *
     *
     * @param {string} event
     * @param {EventHandler} fn
     * @param {*} [ctx]
     * @returns {*}
     *
     * @memberOf IEventEmitter
     */
    once(event: string, fn: EventHandler, ctx?: any): any;
    /**
     *
     *
     * @param {string} event
     * @param {EventHandler} [fn]
     * @param {*} [ctx]
     * @returns {*}
     *
     * @memberOf IEventEmitter
     */
    off(event?: string, fn?: EventHandler, ctx?: any): any;
    /**
     *
     *
     * @param {string} event
     * @param {...any[]} args
     * @returns {*}
     *
     * @memberOf IEventEmitter
     */
    trigger(event: string, ...args: any[]): any;
}
export interface IView extends IEventEmitter {
    render(): this;
    el?: Element;
    destroy(): void;
}
export declare type Constructor<T> = new (...args: any[]) => T;
