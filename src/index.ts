//export * from './controller';
export * from './view';
export * from './event-emitter';
export * from './types';
export * from './mixins';
export * from './decorators';
export * from './base-view';
export * from './utils';
export * from './collection-view';
export * from './array-collection';

import { ViewMountable } from './mixins'
import { IView } from './types';
export function mount<T extends IView>(el: Element, mountable: new (...args: any[]) => T): T {
    let view = ViewMountable.Invoker.get<T>(mountable);
    if (view) view.el = el;
    return view;
}

//export * from './test';
