describe('Decorators', () => {

    describe('@event', () => {

        const ns = viewjs.view;

        it('should modify events', () => {

            const cb = sinon.fake();

            var View = ns.View.inherit({
                events: {
                    'click button': 'onClick'
                },
                onClick: cb
            });

            ns.event('click', 'button')(View.prototype, 'onClick', Object.getOwnPropertyDescriptor(View.prototype, 'onClick'));


            const el = document.createElement('div');
            el.innerHTML = '<button></button>'
            const view = new View({
                el: el
            });
            view.render();

            $(view.el).find('button').click();

            expect(cb.callCount).equal(2);

        });


    });

});