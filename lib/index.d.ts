export * from './controller';
export * from './view';
export * from './event-emitter';
export * from './container';
export * from './template-view';
export * from './types';
import { IView } from './types';
export declare function mount<T extends IView>(el: Element, mountable: new (...args: any[]) => T): T;
