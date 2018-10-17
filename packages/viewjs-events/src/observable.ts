import { EventEmitter } from './event-emitter';
import { EventListener } from './event-listener';
import { EventEmitterListener } from './event-emitter-listener';
import { Base, Subscribable, Subscription } from '@viewjs/utils';


const events = {
    next: Symbol('next'),
    error: Symbol('error'),
    complete: Symbol('complete')
}

export class Observer<T> extends Base {
    private _e = new EventEmitter();
    closed: boolean = false;
    next(value: T | null) {
        if (this.closed) throw new Error('closed');
        this._e.trigger(events.next, value);
        return this;
    }

    error(err: any) {
        if (this.closed) throw new Error('closed');
        this._e.trigger(events.error, err);
        this.closed = true;
    }

    complete() {
        if (this.closed) throw new Error('closed');
        this._e.trigger(events.complete);
        this.closed = true;
    }

    subscriber(): Subscribable<T> {
        return new Observable<T>(this);
    }

}

class SubscriptionImpl extends EventListener {

    unsubscribe() {
        this.stopListening();
    }

}

export class Observable<T> extends Base implements Subscribable<T> {

    private _e = new EventEmitterListener()

    completed: boolean = false;
    value: T | undefined = void 0;
    constructor(private observer: Observer<T>) {
        super();
        this._e.listenTo((this.observer as any)._e, events.next, this._triggerNext, this);
        this._e.listenToOnce((this.observer as any)._e, events.error, this._triggerError, this);
        this._e.listenToOnce((this.observer as any)._e, events.complete, this._triggerCompleted, this);
    }

    subscribe(next: (value: T | null) => any, error?: (err: Error) => any, completed?: () => any): Subscription {
        const sub = new SubscriptionImpl();
        sub.listenTo(this._e, events.next, next, this);

        if (error) sub.listenToOnce(this._e, events.error, error, this);
        if (completed) sub.listenToOnce(this._e, events.complete, completed, this);
        if (typeof this.value !== 'undefined') Promise.resolve(() => next.call(this, this.value));
        return sub;
    }

    unsubscribeAll() {
        this._e.off();
    }

    protected _triggerNext(value: T) {
        this._e.trigger(events.next, value);
        this.value = value;
    }

    protected _triggerError(error: Error) {
        this._e.trigger(events.error, error);
        this.completed = true;
    }

    protected _triggerCompleted() {
        if (this.completed) return;
        this._e.trigger(events.complete);
        this.completed = true;
    }
}