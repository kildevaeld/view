import { IModel } from '@viewjs/models';


export interface ValidationContext extends IModel { }


export interface IValidator {
    readonly message: string;
    validate(value: any, ctx: ValidationContext): boolean;
}

export interface IValidatorCollection {
    validate(value: any, ctx: ValidationContext): void;
    key(): string | undefined;
    label(): string | undefined;
}

export type ValueMap = { [key: string]: any };

export type ValidatorMap = { [key: string]: IValidatorCollection }