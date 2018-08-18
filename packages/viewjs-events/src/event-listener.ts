
import { IEventListener, IEventEmitter, EventHandler } from './types';
import { EventEmitter } from './event-emitter';
import { isEventEmitter } from './helpers';
import { uniqueId, Base } from '@viewjs/utils';
import { Constructor } from '@viewjs/types';

export function withEventListener<T extends Constructor<{}>>(Base: T): Constructor<IEventListener> & T {
    return class extends Base {

        _listeningTo: { [key: string]: IEventEmitter } | undefined = void 0;

        listenTo(obj: IEventEmitter, event: any, fn: EventHandler, ctx?: any, once: boolean = false) {
            if (!isEventEmitter(obj)) {
                if (EventEmitter.throwOnError)
                    EventEmitter.throwError(new TypeError("obj is not an EventEmitter"))
                return this;
            }

            let listeningTo, id, meth: 'once' | 'on';
            listeningTo = this._listeningTo || (this._listeningTo = {});
            id = obj.listenId || (obj.listenId = uniqueId())
            listeningTo[id] = obj;
            meth = once ? 'once' : 'on';

            obj[meth](event, fn, ctx || this);

            return this;
        }


        listenToOnce(obj: IEventEmitter, event: any, fn: EventHandler, ctx?: any) {
            return this.listenTo(obj, event, fn, ctx, true)
        }


        stopListening(obj?: IEventEmitter, event?: any, callback?: EventHandler) {
            if (obj && !isEventEmitter(obj)) {
                if (EventEmitter.throwOnError)
                    EventEmitter.throwError(new TypeError("obj is not an EventEmitter"))
                return this;
            }

            let listeningTo: any = this._listeningTo;
            if (!listeningTo) return this;
            var remove = !event && !callback;
            if (!callback && typeof event === 'object') callback = <any>this;
            if (obj) (<any>(listeningTo = {}))[obj.listenId!] = obj;

            for (var id in listeningTo) {
                obj = listeningTo[id];
                obj!.off(event, callback, this);

                if (remove || obj!.listeners!.size === 0) delete this._listeningTo![id];
            }
            return this;
        }

        destroy() {
            if (typeof Base.prototype.destroy === 'function')
                Base.prototype.destroy.call(this);
            this.stopListening();
            return this;
        }
    }
}

export class EventListener extends withEventListener(Base) { }