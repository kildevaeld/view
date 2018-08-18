import { IValidator, ValidationContext } from './types';
import {
    EmailValidator,
    MaxLengthValidator,
    MinLengthValidator,
    RegexValidator,
    RequiredValidator,
    MatchValidator
} from './validators';
import { createError, ValidationError, ValidationErrors } from './errors';
import { Model } from '@viewjs/models';


export abstract class AbstractValidatorCollection<T> {
    private _label?: string;
    private _key?: string;
    private _required?: RequiredValidator;
    private _validators: IValidator[] = [];

    constructor(key?: string) {
        this._key = key;
    }

    label(label: string): this;
    label(): string | undefined;
    label(label?: string): any {
        if (arguments.length == 0) return this._label;
        this._label = label;
        return this;
    }

    key(key: string): this;
    key(): string | undefined;
    key(key?: string): any {
        if (arguments.length == 0) return this._key;
        this._key = key;
        return this;
    }

    required(msg?: string) {
        this._required = new RequiredValidator(msg);
        return this;
    }

    custom(validator: IValidator) {
        this._addValidator(validator);
    }



    get message(): string {
        return this.getMessage();
    }

    validate(value: T | undefined, ctx: ValidationContext = new Model) {
        if (this._required) {
            if (!this._required.validate(value)) {
                let e = createError(this._required, {
                    label: this._label || '',
                    key: this._key || ''
                });
                throw new ValidationErrors([e]);
            }
        }

        // Not required, but empty
        if (value == null || (typeof value === 'string' && value === '')) {
            return;
        }

        let errors: ValidationError[] = [];

        for (let i = 0, ii = this._validators.length; i < ii; i++) {
            const validator = this._validators[i];
            if (!validator.validate(value, ctx)) {
                errors.push(createError(validator, {
                    label: this._label || '',
                    key: this._key || ''
                }));
            }
        }

        if (errors.length) throw new ValidationErrors(errors);
    }

    protected getMessage(): string {
        return "";
    }

    protected _addValidator(v: IValidator) {
        this._validators.push(v);
        return this;
    }
}

export class StringValidator extends AbstractValidatorCollection<string> {

    email(msg?: string) {
        return this._addValidator(new EmailValidator(msg));
    }

    reqexp(req: RegExp, msg?: string) {
        return this._addValidator(new RegexValidator(msg, req));
    }

    min(len: number, msg?: string) {
        return this._addValidator(new MinLengthValidator(len, msg));
    }

    max(len: number, msg?: string) {
        return this._addValidator(new MaxLengthValidator(len, msg));
    }

    match(selector: string, msg?: string) {
        return this._addValidator(new MatchValidator(selector, msg));
    }

}


export function string(key?: string) {
    return new StringValidator(key);
}