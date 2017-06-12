export declare function indexOf<T>(array: ArrayLike<T>, item: T): number;
export declare type EventListener = (...args: any[]) => void;
export declare function matches(elm: Element, selector: string): boolean;
export declare function addEventListener(elm: EventTarget, eventName: string, listener: EventListener, useCap?: boolean): void;
export declare function removeEventListener(elm: EventTarget, eventName: string, listener: EventListener): void;
