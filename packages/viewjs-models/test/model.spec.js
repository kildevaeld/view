const Model = require('../lib/model').Model,
    types = require('../lib/types'),
    decorators = require('../lib/decorators'),
    sinon = require('sinon');



describe('Model', () => {

    describe('Basic Functionality', () => {
        it('should instantiate', () => {

            const model = new Model();
            model.should.be.instanceOf(Model);
            should.throws(Model);
            model.toJSON().should.be.empty();
            model.should.have.property('id').which.is.undefined();

        });

        it('should instantiate with properties', () => {
            const model = new Model({
                id: '1',
                name: 'test',
                age: 14
            });

            model.toJSON().should.eql({
                id: '1',
                name: 'test',
                age: 14
            });

        });

        it('should set property', () => {
            const model = new Model;

            model.set('name', 'Test');
            model.has('name').should.be.true();
            model[types.MetaKeys.Attributes].has('name').should.be.true();
            model[types.MetaKeys.Attributes].get('name').should.equal('Test');

        });

        it('should get property', () => {
            const model = new Model;

            model.set('name', 'Test');
            model.has('name').should.be.true();
            model.get('name').should.equal('Test');

            model.toJSON().should.eql({
                name: 'Test'
            });
        });

        it('should unset property', () => {

            const model = new Model;
            model.set('name', 'Test');
            model.unset('name');
            model.has('name').should.be.false();
            should(model.get('name')).be.undefined();
        });

        it('should set attribute map', () => {

            const model = new Model();
            const m = {
                name: 'Test',
                age: 14
            };

            model.set(m);
            model.toJSON().should.be.eql(m);

        });

    });

    describe("Observable", () => {
        it('should trigger a change event, when setting new property', () => {

            const changeCb = sinon.fake(),
                changePropCb = sinon.fake();


            const model = new Model();

            model.on('change', changeCb);
            model.on('change:name', changePropCb);

            model.set('name', "Test");

            should(changeCb.calledOnce).be.true();
            should(changeCb.calledOn(model)).be.true();
            should(changeCb.calledWith({
                name: 'Test'
            })).be.true();

            should(changePropCb.callCount).equal(1);
            should(changePropCb.calledOn(model)).true();
            should(changePropCb.calledWith(undefined, "Test")).true();
        });

        it('should not trigger change event, when setting a non new property', () => {

            const changeCb = sinon.fake(),
                changePropCb = sinon.fake();


            const model = new Model();

            model.set('name', "Test");

            model.on('change', changeCb);
            model.on('change:name', changePropCb);

            model.set('name', "Test");

            should(changeCb.callCount).equals(0);
            should(changePropCb.callCount).equal(0);

        });

        it('should only trigger change event for new/changed properties, when setting a value map', () => {

            const changeCb = sinon.fake(),
                changeNamePropCb = sinon.fake(),
                changeAgePropCb = sinon.fake();


            const model = new Model();

            model.set('name', "Test");
            model.set('age', 10);

            model.on('change', changeCb);
            model.on('change:name', changeNamePropCb);
            model.on('change:age', changeAgePropCb);

            model.set({
                name: 'Test',
                age: 14
            });

            should(changeCb.callCount).equals(1);
            should(changeCb.calledWith({
                age: 14
            }));
            should(changeNamePropCb.callCount).equal(0);
            should(changeAgePropCb.calledWith(10, 14)).true();
            should(changeAgePropCb.callCount).equal(1);

        });

        it('should trigger change event when updating a property', () => {

            const changeCb = sinon.fake(),
                changePropCb = sinon.fake();


            const model = new Model();

            model.set('name', "Test");

            model.on('change', changeCb);
            model.on('change:name', changePropCb);

            model.set('name', "Test 2");

            should(changeCb.calledOnce).be.true();
            should(changeCb.calledOn(model)).be.true();
            should(changeCb.calledWith({
                name: 'Test 2'
            })).be.true();

            should(changePropCb.callCount).equal(1);
            should(changePropCb.calledOn(model)).true();
            should(changePropCb.calledWith("Test", "Test 2")).true();


        });

        it('should only trigger on change event, when update multiple properties', () => {

            const changeCb = sinon.fake(),
                changeNamePropCb = sinon.fake(),
                changeAgePropCb = sinon.fake();


            const model = new Model();

            model.on('change:name', changeNamePropCb);
            model.on('change:age', changeAgePropCb);
            model.on('change', changeCb);

            model.set({
                name: 'Test',
                age: 14
            });

            should(changeNamePropCb.calledOnce).true();
            should(changeNamePropCb.calledOn(model)).true();
            should(changeNamePropCb.calledWith(void 0, "Test")).true();

            should(changeAgePropCb.calledOnce).true();
            should(changeAgePropCb.calledOn(model)).true();
            should(changeAgePropCb.calledWith(void 0, 14)).true();

            should(changeCb.calledOnce).true();

        });

    });


    describe('Decorators', () => {

        describe('property decorator', () => {

            var model = new Model;
            Object.defineProperty(model, 'name', decorators.property(model, 'name'))

            model.name = "Test";

            model.get('name').should.equal('Test');

        });




    });
});