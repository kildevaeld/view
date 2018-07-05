describe('View', () => {
    it('should instantiate', () => {
        expect(viewjs.view.View).throwError();

        const view = new viewjs.view.View();

        expect(view.el).to.equal(void 0);
        expect(view.options.attachId).to.equal(true);

    });
});