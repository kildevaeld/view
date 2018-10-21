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

    it('should create element', () => {
        let el = viewjs.html.normalize('<div class="test"></div>');
        expect(el).to.have.length(1);
        expect(el[0]).to.be.an(HTMLElement);
    });

    it('should be a ierator', () => {
        const context = document.createElement('div');
        context.innerHTML = `<div>
            <button class="btn1"></button>
            <button class="btn2"></button>
            <button class="btn3"></button>
        </div>`;

        let $e = viewjs.html.html('button', context);

        let iter = $e[Symbol.iterator]();

        expect(iter.next().value).to.not.equal(null);
        expect(iter.next().value).to.not.equal(null);
        expect(iter.next().value).to.not.equal(null);
        expect(iter.next().value).to.equal(null);

    })

    it('should flattern html', () => {
        const context = document.createElement('div');
        context.innerHTML = `<div>
            <button class="btn1"></button>
            <button class="btn2"></button>
            <button class="btn3"></button>
        </div>`;


        let e1 = viewjs.html.html('.btn1', context),
            e2 = viewjs.html.html('.btn2', context);

        let e3 = viewjs.html.html([e1, e2]);
        expect(e1.get(0)).to.be(e3.get(0));
        expect(e2.get(0)).to.be(e3.get(1));

    });

});