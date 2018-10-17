import { View, BaseViewOptions } from '@viewjs/view';
import { StringValidator, ValidatorMap } from './validator';
import { isPlainObject, Constructor } from '@viewjs/utils'

export function validations(v: ValidatorMap | (() => ValidatorMap)) {
    return function <T extends Constructor<View<E, U>>, E extends HTMLElement, U extends BaseViewOptions<E>>(target: T) {
        if (isPlainObject(target.prototype.validations)) {
            Object.assign(target.prototype.validations, v);
        } else {
            target.prototype.validations = v;
        }
    }
}

export namespace validations {
    /**
     * Returns a string validator collection
     *
     * @export
     * @param {string} [key]
     * @returns {StringValidator}
     */
    export function string(key?: string): StringValidator {
        return new StringValidator(key);
    }

}