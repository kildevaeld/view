import { IEventEmitter, IEventListener } from './types';
import { isFunction } from '@viewjs/utils';

export function isEventEmitter(a: any): a is IEventEmitter {
    return a && ((isFunction(a.on) && isFunction(a.once) && isFunction(a.off) && isFunction(a.trigger)));
}

export function IsEventListener(a: any): a is IEventListener {
    return a && isFunction(a.listenTo) && isFunction(a.listenToOnce) && isFunction(a.stopListening);
}
