import 'reflect-metadata';
import { Container } from '../src';



class Test {
    id = ++Test.count;
    static count = 0;
};


describe('container', () => {


    it('should register handler', () => {
        const container = new Container();

        container.registerHandler('handler', (x) => {
            return x.invoke(class HandlerClass {
                name = "Test mig";
            });
        });

        expect(container.get<any>('handler').name).toEqual("Test mig");

    });

    it('should register instance', () => {
        const container = new Container();
        let o = new Object();
        container.registerInstance("instance", o);
        expect(container.get('instance')).toEqual(o);
    });

    it('should register transient', () => {
        Test.count = 0;
        const container = new Container();

        container.registerTransient("transient", Test);

        const test = container.get<any>("transient");
        expect(test).toBeInstanceOf(Test);
        expect(test.id).toEqual(1);
        expect(container.get<any>('transient').id).toEqual(2);
        expect(container.get<any>('transient').id).toEqual(3);

    });

    it('should register singleton', () => {
        Test.count = 0;
        const container = new Container();

        container.registerSingleton("singleton", Test);

        const test = container.get<any>("singleton");

        expect(test).toBeInstanceOf(Test);
        expect(test).toStrictEqual(container.get("singleton"));
        expect(test.id).toEqual(1);

        expect(container.get<any>('singleton').id).toEqual(1);
        expect(container.get<any>('singleton').id).toEqual(1);

    });

    it('should register factory', () => {
        Test.count = 0;
        const container = new Container();

        container.registerFactory("factory", () => {
            return "Hello, World";
        });

        const test = container.get("factory");

        expect(test).toEqual('Hello, World');


    });


});