export * from './view';
export * from './event-emitter';
export * from './types';
export * from './mixins';
export * from './decorators';
export * from './base-view';
export * from './utils';
export * from './collection-view';
export * from './array-collection';
import { IView } from './types';
export declare function mount<T extends IView>(el: Element, mountable: new (...args: any[]) => T): T;
