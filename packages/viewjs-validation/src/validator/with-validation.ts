import { ObjectValidator, ValidationOptions, ObjectValidatorErrorLireral } from './object-validator';
import { ValidatorMap } from './types';
import { isFunction, isPlainObject, isString } from '@viewjs/utils';
import { ValidationErrors } from './errors';
import { Constructor } from '@viewjs/types';

export interface IValidationController {
    setValidationError(prop: string, error: ValidationErrors): void;
    clearValidationError(prop: string): void;
    clearAllErrors(): this;
    validate(property?: string): any;
}

export interface Serializable {
    toJSON(): any;
}

function getFactory(model: Serializable, input?: ((model: Serializable) => ObjectValidator) | ObjectValidator | ValidatorMap) {
    if (isFunction(input)) return input(model);
    if (isPlainObject(input)) return new ObjectValidator(input as any);
    if (input && (input as any) instanceof ObjectValidator) {
        return input
    }
    return new ObjectValidator();
}

export function withValidation(input?: ((model: Serializable) => ObjectValidator) | ObjectValidator | ValidatorMap) {
    return function <T extends Constructor<Serializable>>(Base: T): T & Constructor<IValidationController> {
        return class extends Base {

            private _validator!: ObjectValidator;
            private _errors: ObjectValidatorErrorLireral | undefined = void 0;

            get validator() {
                if (!this._validator) {
                    this._validator = getFactory(this, input);
                }
                return this._validator;
            }

            constructor(...args: any[]) {
                super(...args);
            }

            validate(property?: string) {

                let value = this.toJSON(),
                    options: ValidationOptions = {}
                if (isString(property)) {
                    value = { [property]: value[property] }
                    options.ignoreMissing = true;
                }
                //triggerMethodOn(this, 'before:validation', value, options);
                this.clearAllErrors();
                try {
                    this.validator.validate(value, options);
                    //triggerMethodOn(this, 'validation', value);
                } catch (e) {
                    this._errors = {};
                    for (let key in e.error) {
                        this.setValidationError(key, e.error[key]);
                    }
                    //triggerMethodOn(this, 'validation', value, e);
                    throw e;
                }
            }

            setValidationError(target: string, error: ValidationErrors): void {
                if (!this._errors) this._errors = {};
                this._errors[target] = error;
            }

            clearValidationError(target: string): void {
                if (!this._errors) return;
                delete this._errors[target];
            }

            clearAllErrors(): this {
                if (!this._errors) return this;
                for (let key in this._errors) {
                    this.clearValidationError(key);
                }
                this._errors = void 0;
                return this;
            }

        };
    }
}