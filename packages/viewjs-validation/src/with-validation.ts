
import { ValidationErrors, IValidatorCollection, ValidatorMap, ObjectValidatorError, ObjectValidatorErrorLireral } from './validator';
import { View, DelegateEvent, EventsMap } from '@viewjs/view';
import { result, has } from '@viewjs/utils';
import { Constructor } from '@viewjs/types';
import { getValue } from '@viewjs/html';
import { Model } from '@viewjs/models';


export interface IValidationView {
    validations: ValidatorMap | ((this: IValidationView) => ValidatorMap);
    /**
     * Validate view. Throws a ValidationErrors on error
     * Will all call setValidationError on error, and clearValidationError when no error
     * 
     * @param {boolean} [silent] 
     * @memberof IValidationView
     */
    validate(silent?: boolean): void;
    /**
     * Check if the view validates to true
     * 
     * @returns {boolean} 
     * @memberof IValidationView
     */
    isValid(): boolean;
    /**
     * This is called when a element is invalid
     * 
     * @param {HTMLElement} target 
     * @param {ValidationErrors} error 
     * @memberof IValidationView
     */
    setValidationError(target: HTMLElement, error: ValidationErrors): void;
    clearValidationError(target: HTMLElement): void;
    clearAllErrors(): this;
}


function eventsAdd(events: EventsMap, eventStr: string, fn: Function) {
    if (has(events, eventStr)) {
        if (!Array.isArray(events[eventStr])) events[eventStr] = events[eventStr];
    } else {
        events[eventStr] = [];
    }
    (events[eventStr] as any[]).push(fn);
}


export interface WithValidationOptions {
    event: string;
}

export function withValidationView<
    T extends Constructor<View>,
    >(Base: T, options: WithValidationOptions = { event: 'change' }): T & Constructor<IValidationView> {

    function validation_wrap<T extends any>(self: T, v: IValidatorCollection) {
        return function (this: T, e: DelegateEvent) {
            let target = e.delegateTarget || e.target;
            if (!target) throw new TypeError('no target');

            const value = getValue(target as HTMLElement);
            // let valid = true;
            const ctx = this._getValidationContext();

            try {
                v.validate(value, ctx);
                if (typeof this.clearValidationError === 'function') {
                    this.clearValidationError(target);
                }
            } catch (e) {
                if (typeof this.setValidationError === 'function') {
                    this.setValidationError(target, e);
                }
                // valid = false;
            }
            //triggerMethodOn(this, 'valid', this.isValid());
            //triggerMethodOn(this, 'change:value', target, value, valid);

        }.bind(self);
    }


    return class extends Base {

        validations!: ValidatorMap | ((this: any) => ValidatorMap);


        delegateEvents(events: EventsMap) {
            events = Object.assign({}, events || result(this, 'events') || {});

            const v = this._getValidations();

            for (let key in v) {

                const wrapper = validation_wrap(this, v[key]);

                eventsAdd(events, `${options.event} ${key}`, wrapper);
                if (options.event != 'change')
                    eventsAdd(events, `change ${key}`, wrapper);
                eventsAdd(events, `blur ${key}`, (e: DelegateEvent) => {
                    let target = e.delegateTarget as HTMLElement,
                        value = getValue(target);
                    if (!value) this.clearValidationError(target);
                });

            }

            super.delegateEvents(events);

            return this;
        }


        validate(silent: boolean = false): void {

            const v = this._getValidations(),
                errors = {} as ObjectValidatorErrorLireral,
                ctx = this._getValidationContext(v);

            for (let key in v) {
                let el = this.el!.querySelector(key) as HTMLElement;

                try {
                    v[key].validate(getValue(el as HTMLElement), ctx);
                    if (!silent)
                        this.clearValidationError(el!);
                } catch (e) {
                    let k = v[key].key() || key;
                    if (!silent)
                        this.setValidationError(el!, e);
                    errors[k] = e;
                }
            }

            const valid = Object.keys(errors).length == 0;
            //triggerMethodOn(this, 'valid', valid);

            if (!valid) {
                throw new ObjectValidatorError(errors);
            }


        }

        isValid() {
            try {
                this.validate(true);
                return true;
            } catch (e) {
                return false;
            }
        }

        clearAllErrors() {
            // const ui = (<any>this)._ui || this.ui,
            //     v: any = normalizeUIKeys(this.validations, ui);
            // for (let key in v) {
            //     let el = this.el!.querySelector(key);
            //     this.clearValidationError(el as HTMLElement);
            // }

            return this;
        }

        private _getValidations(): ValidatorMap {
            // const ui = (<any>this)._ui || this.ui,
            //     validations = result(this, 'validations') || {},
            //     v: any = normalizeUIKeys(validations, ui);

            return {}//void 0 //v;
        }

        private _getValidationContext(map?: ValidatorMap, ignore: string[] = []): Model {
            map = map || this._getValidations();
            let val: any = {}, el: HTMLElement | null, k: string;
            for (let key in map) {
                k = map[key].key() || key;
                if (~ignore.indexOf(k))
                    continue;
                el = this.el!.querySelector(key);

                val[k] = getValue(el!);
            }
            return new Model(val);
        }

        setValidationError(_target: HTMLElement, _error: ValidationErrors): this { return this; }
        clearValidationError(_target: HTMLElement): this { return this; }

    }
}

