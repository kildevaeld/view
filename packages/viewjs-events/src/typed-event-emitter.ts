import { IEventEmitter } from './types';
import { EventEmitter } from './event-emitter';
import { Constructor } from '@viewjs/types';

export interface EventConstructor<T> {
    new(...args: any[]): T
    prototype: T
}

export interface TypedEventHandler<T> {
    (e: T): void;
}

export interface ITypedEventEmitter {
    on<T>(e: EventConstructor<T> | string, callback: TypedEventHandler<T>, ctx?: any): this;
    once<T>(e: EventConstructor<T> | string, callback: TypedEventHandler<T>, ctx?: any): this;
    off<T>(e: EventConstructor<T> | string, callback: TypedEventHandler<T>, ctx?: any): this;
    trigger<T>(e: T | string, ...args: any[]): this;
}

export function withTypedEventEmitter<T extends Constructor<IEventEmitter>>(Base: T): T & Constructor<ITypedEventEmitter> {
    return class extends Base {

        on<T>(e: EventConstructor<T> | string, callback: TypedEventHandler<T>, ctx?: any) {
            return super.on(e, callback, ctx);
        }

        once<T>(e: EventConstructor<T> | string, callback: TypedEventHandler<T>, ctx?: any) {
            return super.once(e, callback, ctx);
        }

        off<T>(e: EventConstructor<T> | string, callback: TypedEventHandler<T>, ctx?: any) {
            return super.off(e, callback, ctx);
        }

        trigger<T>(e: T | string, ...args: any[]) {
            if (typeof e === 'string') {
                return super.trigger(e, ...args);
            }
            if (e.constructor) {
                return super.trigger(e.constructor, e);
            }

            return this
        }
    };
}

export class TypedEventEmitter extends withTypedEventEmitter(EventEmitter) { }



