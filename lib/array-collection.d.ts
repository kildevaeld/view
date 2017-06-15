import { EventEmitter } from './event-emitter';
import { ICollection } from './types';
export declare class ArrayCollection<T> extends EventEmitter implements ICollection<T> {
    private a;
    constructor(a?: Array<T>);
    readonly length: number;
    item(index: number): T | undefined;
    push(m: T): void;
    pop(): T | undefined;
    insert(m: T, index: number): void;
    indexOf(m: T): number;
    remove(index: number): T | undefined;
    find(fn: (m: T) => boolean): T | undefined;
    sort(fn: (a: T, b: T) => number): void;
    clear(): void;
    array(): T[];
}
export declare namespace ModelEvents {
    const Add = "add";
    const Remove = "remove";
    const Clear = "clear";
    const Sort = "sort";
}
