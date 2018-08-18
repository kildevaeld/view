
import { IValidator } from './types';
import { tim } from './tim';


export class ValidationError extends Error {
    constructor(message: string, public validator?: IValidator) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class ValidationErrors extends Error {
    constructor(public errors: ValidationError[], message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export function createError(v: IValidator | { message: string }, label?: string | { [key: string]: string }) {
    if (typeof label === 'string') {
        label = { label: label };
    }

    let msg = '';
    if (v.message)
        msg = tim(v.message, label);

    return new ValidationError(msg, v as any);
}