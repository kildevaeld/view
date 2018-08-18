describe('Validator', () => {

    describe('Factory', () => {

        const ns = viewjs.validation;

        it('should instantiate', () => {
            const factory = new ns.ObjectValidator({
                name: ns.string().required(),
                email: ns.string().email()
            });


        });


        it('should validate single property', () => {
            const factory = new ns.ObjectValidator({
                name: ns.string().required(),
                email: ns.string().email()
            });

            try {
                factory.validate({
                    name: ''
                }, {
                    ignoreMissing: true
                });
            } catch (e) {
                e.should.instanceOf(ns.ObjectValidatorError);
                //e.errors.should.have.property('rapper').instanceOf(ns.ValidationsErrors);
                //e.errors.should.not.have.property('email');

            }

        });


    });


});