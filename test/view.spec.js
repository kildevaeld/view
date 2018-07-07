function createElement(tag, content) {
    const el = document.createElement(tag);
    el.innerHTML = content;
    return el;
}


describe('View', function () {

    it('should instantiate', () => {
        expect(viewjs.view.View).throwError();

        const view = new viewjs.view.View();
        expect(view.el).to.equal(void 0);
        expect(view.options).to.not.eql(null);
        expect(Object.keys(view.options).length).to.equal(0);
        expect(view.vid).to.not.eql(null);
        expect(typeof view.vid === 'string').to.eql(true);

    });

    it('should hook up ui map', () => {

        const el = createElement('div', `
            <button><button>
            <div>
                <h1></h1>
            </div>
        `)

        let view = new viewjs.view.View({
            el: el
        });

        view._ui = {
            button: 'button',
            header: 'h1'
        };

        view.render();

        expect(view.ui.button instanceof HTMLButtonElement).to.be.equal(true);
        expect(view.ui.header instanceof HTMLHeadingElement).to.be.equal(true);

    });

    it('should hook up triggers', () => {

        const cb = sinon.fake();

        const el = createElement('div', `
            <button><button>
            <div>
                <h1></h1>
            </div>
        `)

        let view = new viewjs.view.View({
            el: el
        });

        view.triggers = {
            'click button': 'button:clicked',
        };

        view.onButtonClicked = cb;

        view.render();


        $(view.el).find('button').click();


        expect(cb.callCount).to.equal(1);


    });

    it('should hook up events from events map', () => {

        const cb1 = sinon.fake(),
            cb2 = sinon.fake(),
            cb3 = sinon.fake(),
            cb4 = sinon.fake()

        const el = document.createElement('div');
        el.innerHTML = `
            <button class="btn1"></button>
            <button class="btn2"></button>
            <button class="btn3"></button>
        `;

        const view = new viewjs.view.View({
            el: el
        });

        view.onClick = cb2;
        view.onClick2 = cb4;

        view.events = {
            'click button.btn1': cb1,
            'click button.btn2': 'onClick',
            'click button.btn3': [cb3, 'onClick2']
        }

        view.render();

        $(view.el).find('.btn1').click();
        $(view.el).find('.btn2').click();
        $(view.el).find('.btn3').click();

        expect(cb1.calledOnce).to.equal(true);
        expect(cb2.calledOnce).to.equal(true);
        expect(cb3.calledOnce).to.equal(true);
        expect(cb4.calledOnce).to.equal(true);

    });

});