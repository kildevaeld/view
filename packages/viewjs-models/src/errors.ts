
import { isString } from "@viewjs/utils";

export enum ModelErrorCode {
    Unknown, MissingStorage, NotFound
}

export class ModelError extends Error {
    constructor(public message: string = "", public code: ModelErrorCode) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export function createError(code: ModelErrorCode | string, message?: string) {
    if (isString(code)) {
        message = code
        code = ModelErrorCode.Unknown;
    }
    return new ModelError(message, code);
}
