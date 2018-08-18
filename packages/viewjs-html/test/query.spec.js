describe('Query', () => {

    it('basic', () => {
        let out = viewjs.html.normalize('body');
        expect(out.length).to.equal(1);
        expect(out[0]).to.equal(document.body);
    });

    it('', () => {
        const context = document.createElement('div');
        context.innerHTML = `<div bind="name"></div><button>Rapper</button>`;

        let out = viewjs.html.normalize('button', context);
        console.log(viewjs.html.normalize(document))
    });

    it('shold create element', () => {
        let el = viewjs.html.normalize('<div class="test"></div>');
        console.log(el);
    });

})