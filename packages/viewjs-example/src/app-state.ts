import { singleton } from '@viewjs/di'
import { Subscribable, Subscription } from '@viewjs/types';
import { Observer } from '@viewjs/events';


export enum State {
    List, UserForm
}

@singleton()
export class AppState implements Subscribable<State> {
    subscribe(next: (value: State | null) => any, error?: ((err: Error) => any) | undefined, completed?: (() => any) | undefined): Subscription {
        return this.observable.subscribe(next, error, completed);
    }
    private _state: State = State.List;
    observer: Observer<State> = new Observer()
    observable: Subscribable<State> = this.observer.subscriber()

    get state() {
        return this._state;
    }

    set state(state: State) {
        const ok = this._state != state
        this._state = state;
        setTimeout(() => {
            this.observer.next(state)
        }, 0);
    }
}