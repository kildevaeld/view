import { IView } from './types';
import { isFunction } from '@viewjs/utils';

export function isViewLike(a: any): a is IView {
    return a && isFunction(a.render) && isFunction(a.destroy);
}