export * from './controller';
export * from './view';
export * from './event-emitter';
export * from './types';
export * from './mixins';
import { IView } from './types';
export declare function mount<T extends IView>(el: Element, mountable: new (...args: any[]) => T): T;
