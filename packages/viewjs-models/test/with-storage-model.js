const Model = require('../lib/model').Model,
    withStorageModel = require('../lib/with-storage-model').withStorageModel,
    {
        ModelEvents
    } = require('../lib/types'),
    {
        createError,
        ModelErrorCode
    } = require('../lib/errors'),
    sinon = require('sinon'),
    Storage = require('./fixtures/storage').Storage;

describe('withStorageModel', () => {

    describe('Basic', () => {
        const storage = new Storage();
        const PModel = withStorageModel(Model, storage);

        beforeEach(() => {
            storage.items.length = 0;
        });


        it('should not create model if properties is empty', async () => {

            const model = new PModel()
            await model.save();
            storage.items.should.be.empty();
        });

        it('should create', async () => {

            const model = new PModel({
                name: 'test'
            })
            await model.save();
            storage.items.length.should.equal(1)
            storage.items[0].should.equal(model);
            model.id.should.be.of.type('string');

        });

        it('should update', async () => {

            const model = new PModel({
                name: 'test'
            })
            await model.save();

            const id = model.id;
            model.set('name', 'test updated');

            await model.save();

            model.id.should.equal(id);
            model.get('name').should.equal('test updated');
            storage.items.length.should.equal(1);
            storage.items[0].should.equal(model);

        });

        it('should fetch', async () => {

            await (new PModel({
                name: 'rapper'
            })).save();

            const model = new PModel({
                name: 'test'
            });

            await model.save();

            const found = new PModel({
                id: model.id
            });

            await found.fetch();

            found.get('name').should.be.equal('test');
            found.id.should.equal(model.id);

        });

        it('should delete', async () => {

            const model = new PModel({
                name: 'test'
            });

            await model.save();
            await model.delete();

            storage.items.length.should.equal(0);

        });

    });

    describe('Observable', () => {

        const storage = new Storage();
        const PModel = withStorageModel(Model, storage);

        beforeEach(() => {
            storage.items.length = 0;
        });


        it('should trigger "save" event on creation', async () => {

            const cb = sinon.fake();

            const model = new PModel({
                name: 'test'
            });

            model.on(ModelEvents.BeforeSave, cb);
            model.on(ModelEvents.Save, cb);

            await model.save();

            cb.callCount.should.equal(2);

        });

        it('should trigger "save" event on update', async () => {

            const cb = sinon.fake();

            const model = new PModel({
                name: 'test'
            });

            model.on(ModelEvents.BeforeSave, cb);
            model.on(ModelEvents.Save, cb);

            await model.save();

            model.set('name', 'test');

            await model.save();

            model.set('name', 'test 2');

            await model.save();

            cb.callCount.should.equal(4);

        });

        it('should trigger "fetch" event on fetch', async () => {

            const cb = sinon.fake();

            await (new PModel({
                name: 'test'
            })).save();

            const model = new PModel({
                id: storage.items[0].id
            })


            model.on(ModelEvents.BeforeFetch, cb);
            model.on(ModelEvents.Fetch, cb);

            await model.fetch();

            cb.callCount.should.equal(2);

        });

        it('should trigger "delete" event on delete', async () => {

            const cb = sinon.fake();

            const model = new PModel({
                name: 'test'
            });

            await model.save();

            model.on(ModelEvents.BeforeDelete, cb);
            model.on(ModelEvents.Delete, cb);

            await model.delete();

            cb.callCount.should.equal(2);

        });


        it('should not trigger "save" event on creation', async () => {

            const cb = sinon.fake();

            const model = new PModel({
                name: 'test'
            });

            model.on(ModelEvents.BeforeSave, cb);
            model.on(ModelEvents.Save, cb);

            await model.save({
                silent: true
            });

            cb.callCount.should.equal(0);

        });

        it('should not trigger "save" event on update', async () => {

            const cb = sinon.fake();

            const model = new PModel({
                name: 'test'
            });

            model.on(ModelEvents.BeforeSave, cb);
            model.on(ModelEvents.Save, cb);

            await model.save({
                silent: true
            });

            model.set('name', 'test');

            await model.save();

            model.set('name', 'test 2');

            await model.save({
                silent: true
            });

            cb.callCount.should.equal(0);

        });

        it('should not trigger "fetch" event on fetch', async () => {

            const cb = sinon.fake();

            await (new PModel({
                name: 'test'
            })).save();

            const model = new PModel({
                id: storage.items[0].id
            })


            model.on(ModelEvents.BeforeFetch, cb);
            model.on(ModelEvents.Fetch, cb);

            await model.fetch({
                silent: true
            });

            cb.callCount.should.equal(0);

        });

        it('should trigger "delete" event on delete', async () => {

            const cb = sinon.fake();

            const model = new PModel({
                name: 'test'
            });

            await model.save({
                silent: true
            });

            model.on(ModelEvents.BeforeDelete, cb);
            model.on(ModelEvents.Delete, cb);

            await model.delete({
                silent: true
            });

            cb.callCount.should.equal(0);

        });



    });

});