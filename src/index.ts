export * from './controller';
export * from './view';
export * from './event-emitter';
export * from './container';
//export * from './test';
export * from './types';

import { container } from './container'
import { IView } from './types';
export function mount<T extends IView>(el: Element, mountable: new (...args: any[]) => T): T {
    return container().mount(el, mountable);
}