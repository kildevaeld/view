describe('WithAttachedViews', () => {

    const vn = viewjs.view;

    it('should instantiate attached views', () => {
        let View = vn.withAttachedViews(vn.View);

        View.prototype.views = {
            subView: {
                selector: '.attach',
                view: vn.View
            }
        };

        const view = new View();
        expect(view.subView instanceof vn.View).to.equal(true)


    });

    it('should should set subview el to target', () => {
        let View = vn.withAttachedViews(vn.View);

        const el = document.createElement('div');
        el.innerHTML = `
            <div class="attach"></div>
        `

        View.prototype.views = {
            subView: {
                selector: '.attach',
                view: vn.View
            }
        };

        const view = new View();
        view.el = el;

        view.render()

        let attach = el.querySelector('.attach');
        expect(view.subView.el).to.equal(attach);


    });


});