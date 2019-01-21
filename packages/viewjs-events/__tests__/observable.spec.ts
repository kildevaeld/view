import { Observable, Observer } from '../src';

describe('Observable', () => {

    it('should', () => {

        let p = new Observer();

        let o = new Observable(p);

        const next = jest.fn(),
            complete = jest.fn(),
            err = jest.fn();

        o.subscribe(next, err, complete);

        p.next('test').next('test2').complete();

        expect(next.mock.calls.length).toEqual(2);
        expect(next.mock.calls[0][0]).toEqual('test');
        expect(next.mock.calls[1][0]).toEqual('test2');
        expect(complete.mock.calls.length).toEqual(1);

        expect(() => p.complete()).toThrow();
        expect(() => p.error(void 0)).toThrow();
        expect(() => p.next(null)).toThrow();
        expect(p.closed).toEqual(true);


    })

});