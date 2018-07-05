describe('BaseView', function () {

    it('sould instansiate', () => {
        expect(viewjs.view.BaseView).throwError();

        const view = new viewjs.view.BaseView();
        expect(view.el).to.equal(void 0);
        expect(view.options).to.not.eql(null);
        expect(Object.keys(view.options).length).to.equal(0);
        expect(view.vid).to.not.eql(null);
        expect(typeof view.vid === 'string').to.eql(true);

    });

})