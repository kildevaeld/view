describe('Observable', () => {

    it('should', () => {

        let p = new viewjs.events.Observer();

        let o = new viewjs.events.Observable(p);

        const next = sinon.fake(),
            complete = sinon.fake(),
            err = sinon.fake();

        const sub = o.subscribe(next, err, complete);

        p.next('test').next('test2').complete();

        expect(next.callCount).equal(2);
        expect(next.getCall(0).calledWith('test'));
        expect(next.getCall(1).calledWith('test2'));
        expect(complete.callCount).equal(1);

        expect(() => p.complete()).throwError()
        expect(() => p.error()).throwError();
        expect(() => p.next()).throwError();
        expect(p.closed).equal(true);

    })

});