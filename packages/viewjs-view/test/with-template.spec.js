describe('withTemplate', () => {

    const vn = viewjs.view;

    it('should inject template string into el', () => {

        let view = new(vn.withTemplate(vn.View))({
            el: document.createElement('div')
        });

        view.template = 'Hello, World!';
        view.render();
        expect(view.el.innerText).to.equal("Hello, World!");
    });

    it('should inject template function into el', () => {

        let view = new(vn.withTemplate(vn.View))({
            el: document.createElement('div')
        });
        view.model = {
            who: 'world'
        };
        view.template = (model) => `Hello, ${model.who}!`;
        view.render();
        expect(view.el.innerText).to.equal("Hello, world!");
    });

    it('should mount renderer', () => {

        let view = new(vn.withTemplate(vn.View))({
            el: document.createElement('div')
        });

        view.template = {
            mount: (model, container) => container.innerText = `Hello, ${model.who}!`,
            unmount: () => {}
        };
        view.model = {
            who: 'World'
        }
        view.render();
        expect(view.el.innerText).to.equal("Hello, World!");
    });

    it('should unmount render on destroy', () => {
        let view = new(vn.withTemplate(vn.View))({
            el: document.createElement('div')
        });

        let cb = sinon.spy();

        var templateRef = 1234;
        view.template = {
            mount: (model, container) => {
                container.innerText = `Hello, World!`
                return templateRef;
            },
            unmount: (ref) => {
                expect(ref === templateRef).to.equal(true);
                cb();
            }
        };
        view.render().destroy();

        expect(cb.calledOnce === true).to.equal(true);
    });

});