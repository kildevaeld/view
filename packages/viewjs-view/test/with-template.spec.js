describe('withTemplate', () => {

    const vn = viewjs.view;

    it('should inject template string in to el', () => {

        let view = new(vn.withTemplate(vn.View))({
            el: document.createElement('div')
        });

        view.template = 'Hello, World!';
        view.render();
        expect(view.el.innerText).to.equal("Hello, World!");
    });

});