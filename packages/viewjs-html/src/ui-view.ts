import { Constructor, result, debug as Debug, slice } from '@viewjs/utils';
import { View, EventsMap } from '@viewjs/view'
import { Html } from './html'
import { normalizeUIKeys } from './utils';

const debug = Debug('viewjs:html');

export interface UIView {
    readonly ui: { [key: string]: Html };
}

const UiMapMetaKey = Symbol('view@uimap');


export type UIStringMap = { [key: string]: string };
export type UIMap = { [key: string]: Html };

export function ui(ui: UIStringMap) {
    return function <T extends UIView>(target: Constructor<T>) {
        let meta = Reflect.getOwnMetadata(UiMapMetaKey, target.prototype);
        if (!meta) {
            meta = {};
            Reflect.defineMetadata(UiMapMetaKey, meta, target.prototype);
        }
        for (let k in ui) {
            meta[k] = ui[k];
        }
    }
}

export function getUIMap(target: any): UIStringMap {
    return Reflect.getMetadata(UiMapMetaKey, target) || {};
}


export function withUIMap<T extends Constructor<View>>(Base: T): T & Constructor<UIView> {

    return class extends Base {
        private _ui: UIMap = {};

        get ui() {
            return this._ui;
        }

        delegateEvents(events?: EventsMap) {
            events = events || result(this, 'events') || {};
            const uiMap = Reflect.getMetadata(UiMapMetaKey, this) || {};
            events = normalizeUIKeys(events, uiMap);
            this._bindUIElements(uiMap);
            super.delegateEvents(events);
        }

        undelegateEvents() {
            this._ui = {};
            return super.undelegateEvents();
        }


        private _bindUIElements(ui: UIStringMap) {
            Object.keys(ui).forEach((k) => {
                let elm = this.el!.querySelectorAll(ui[k]);
                if (elm && elm.length) {
                    debug('%s added ui element %s %s', this, k, ui[k]);
                    this._ui[k] = new Html(slice(elm) as any);
                } else {
                    debug('%s ui element not found ', this, k, ui[k]);
                }
            });
        }
    }
}


