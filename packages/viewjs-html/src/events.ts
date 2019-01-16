
interface DomEvent {
    event: string;
    callback: DomEventHandler;
    ctx?: any;
    bound?: DomEventHandler;
    options?: EventListenerOptions | boolean;
    once: boolean;
}


const domEvents: Map<EventTarget, DomEvent[]> = new Map()

export interface DomEventHandler {
    (e: Event): any;
}


export function addEventListener(target: EventTarget, event: string, callback: (event: Event) => void, useCap?: boolean | EventListenerOptions, ctx?: any, once?: boolean) {
    let entries = domEvents.get(target);
    if (!entries) {
        entries = [];
        domEvents.set(target, entries);
    }

    const bound = !ctx ?
        !once ? void 0 : (e: Event) => {
            callback(e);
            removeEventListener(target, event, bound);
        }
        :
        (...args: any[]) => {
            callback.apply(ctx, args as any);
            if (once) removeEventListener(target, event, bound, ctx);
        }
    target.addEventListener(event, bound || callback, useCap);
    entries.push({
        event: event,
        callback: callback,
        ctx: ctx,
        bound: bound,
        options: useCap,
        once: !!once
    });
}

export function removeEventListener(target: EventTarget, event?: string, callback?: (event: Event) => void, ctx?: any) {
    let entries = domEvents.get(target) || [];

    entries = entries.filter(m => {
        if ((!event || event === m.event) &&
            (!callback || callback === m.callback) &&
            (!ctx || ctx === m.ctx)) {
            target.removeEventListener(m.event, m.bound || m.callback, m.options);
            return false;
        }

        return true;
    });

    if (!entries.length) domEvents.delete(target);
    else domEvents.set(target, entries);
}