import { ObjectValidator, ObjectValidatorError, string } from '../src';

describe('Validator', () => {

    describe('Factory', () => {

        it('should instantiate', () => {
            new ObjectValidator({
                name: string().required(),
                email: string().email()
            });

        });


        it('should validate single property', () => {
            const factory = new ObjectValidator({
                name: string().required(),
                email: string().email()
            });

            try {
                factory.validate({
                    name: ''
                }, {
                        ignoreMissing: true
                    });
            } catch (e) {
                expect(e).toBeInstanceOf(ObjectValidatorError);

                //e.errors.should.have.property('rapper').instanceOf(ns.ValidationsErrors);
                //e.errors.should.not.have.property('email');

            }

        });


    });


});