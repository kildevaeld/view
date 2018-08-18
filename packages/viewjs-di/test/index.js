const Container = require('../lib').Container;



class Test {
    constructor() {
        this.id = ++Test.count;
    }
};

Test.count = 0;

describe('container', () => {


    it('should register handler', () => {
        const container = new Container();

        container.registerHandler('handler', (x) => {
            return x.invoke(function () {
                this.name = "Test mig";
            })
        });

        should.equal("Test mig", container.get('handler').name);

    });

    it('should register instance', () => {
        const container = new Container();

        let o = new Object();
        container.registerInstance("instance", o);
        should.equal(o, container.get('instance'));
    });

    it('should register transient', () => {
        Test.count = 0;
        const container = new Container();

        container.registerTransient("transient", Test);

        const test = container.get("transient");
        test.should.be.instanceOf(Test);
        should.equal(1, test.id);
        should.equal(2, container.get('transient').id);
        should.equal(3, container.get('transient').id);
    });

    it('should register singleton', () => {
        Test.count = 0;
        const container = new Container();

        container.registerSingleton("singleton", Test);

        const test = container.get("singleton");


        test.should.be.instanceOf(Test);
        test.should.equal(test, container.get("singleton"));
        should.equal(1, test.id);
        should.equal(1, container.get('singleton').id);
        should.equal(1, container.get('singleton').id);
    });

    it('should register factory', () => {
        Test.count = 0;
        const container = new Container();

        container.registerFactory("factory", () => {
            return "Hello, World";
        });

        const test = container.get("factory");

        test.should.equal("Hello, World");

    });


});