import { IValidator, ValidationContext } from './types';
import { equal } from '@viewjs/utils';

export abstract class AbstractValidator {
    message!: string;
    constructor(msg?: string) {
        if (msg) this.message = msg;
    }
}

export class RequiredValidator extends AbstractValidator implements IValidator {

    validate(value: any): boolean {
        if (value === null || value === void 0) return false;
        if (typeof value === 'string' && value == '') return false;

        return true;
    }

    constructor(msg: string = "{{label}} is missing") {
        super(msg);
    }
}

export class RegexValidator extends AbstractValidator implements IValidator {
    readonly regex!: RegExp;
    constructor(msg: string = "{{label}} is invalid", regex?: RegExp) {
        super(msg);
        (<any>this).regex = regex;
    }
    validate(value: any): boolean {
        return this.regex.test(String(value));
    }
}

export class EmailValidator extends RegexValidator {
    regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(msg: string = "{{label}} is not a valid email addresss") {
        super(msg);
    }
}

export class MinLengthValidator extends AbstractValidator implements IValidator {
    len: number;

    constructor(n: number, msg?: string) {
        super(msg);
        this.len = n;
    }

    validate(value: any): boolean {
        if (typeof value === 'string') {
            return value.length >= this.len;
        } else if (typeof value === 'number') {
            return value >= this.len;
        }
        return false;
    }
}


export class MaxLengthValidator extends AbstractValidator implements IValidator {
    len: number;
    constructor(n: number, msg?: string) {
        super(msg);
        this.len = n;
    }

    validate(value: any): boolean {
        if (typeof value === 'string') {
            return value.length <= this.len;
        } else if (typeof value === 'number') {
            return value <= this.len;
        }
        return false;
    }
}


export class MatchValidator extends AbstractValidator implements IValidator {

    constructor(private selector: string, msg?: string) {
        super(msg);
    }

    validate(value: any, ctx: ValidationContext): boolean {
        if (!ctx.has(this.selector)) {
            throw new TypeError(`element with selector: "${this.selector}" not found in context`);
        }

        return equal(value, ctx.get(this.selector));
    }

}
