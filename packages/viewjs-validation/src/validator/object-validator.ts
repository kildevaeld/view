import { ValidatorMap, IValidatorCollection, ValueMap } from './types';
import { StringValidator } from './validator';
import { ValidationErrors, ValidationError } from './errors';
import { Constructor } from '@viewjs/utils';
import { Model } from '@viewjs/models';

export type ObjectValidatorErrorLireral = { [key: string]: ValidationErrors };

export class ObjectValidatorError extends Error {
    constructor(public errors: ObjectValidatorErrorLireral) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export interface ValidationOptions {
    ignoreMissing?: boolean;
}

export class ObjectValidator {
    constructor(
        private validations: ValidatorMap = {}
    ) {

    }

    prop<T extends IValidatorCollection = StringValidator>(name: string, Collection?: Constructor<T>): T {
        if (this.validations[name]) return this.validations[name] as T;
        this.validations[name] = Collection ? new Collection(name) : new StringValidator(name);
        return this.validations[name] as T;
    }

    clear() {
        this.validations = {};
        return this;
    }

    validate(values: ValueMap, options: ValidationOptions = {}) {

        let properties = Object.keys(this.validations);
        let errors: ObjectValidatorErrorLireral = {};

        const ctx = new Model(values)

        for (let key of properties) {
            if (!ctx.has(key)) {
                if (!options.ignoreMissing)
                    errors[key] = new ValidationErrors([new ValidationError(`missing property in value map: '${key}'`)])

                break;
            }
            try {
                this.validations[key].validate(ctx.get(key), ctx);
            } catch (e) {
                errors[key] = e;
            }
        }

        if (Object.keys(errors).length) throw new ObjectValidatorError(errors);
    }
}