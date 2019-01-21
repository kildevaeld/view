import {
    View,
    withTemplate
} from '../src';

describe('withTemplate', () => {


    it('should inject template string into el', () => {

        let view = new (withTemplate(View))({
            el: document.createElement('div')
        });

        view.template = 'Hello, World!';
        view.render();
        expect(view.el!.innerHTML).toEqual("Hello, World!");
    });

    it('should inject template function into el', () => {

        let view = new (withTemplate(View))({
            el: document.createElement('div')
        });
        view.model = {
            who: 'world'
        };
        view.template = (model: any) => `Hello, ${model.who}!`;
        view.render();
        expect(view.el!.innerHTML).toEqual("Hello, world!");
    });

    it('should mount renderer', () => {

        let view = new (withTemplate(View))({
            el: document.createElement('div')
        });

        view.template = {
            mount: (model: any, container: any) => container.innerText = `Hello, ${model.who}!`,
            unmount: () => { }
        } as any;
        view.model = {
            who: 'World'
        }
        view.render();
        expect(view.el!.innerText).toEqual("Hello, World!");
    });

    it('should unmount render on destroy', () => {
        let view = new (withTemplate(View))({
            el: document.createElement('div')
        });

        let cb = jest.fn(() => { });

        var templateRef = 1234;
        view.template = {
            mount: (_model: any, container: any) => {
                container.innerText = `Hello, World!`
                return templateRef;
            },
            unmount: (ref: any) => {
                expect(ref === templateRef).toEqual(true);
                cb();
            }
        } as any;
        view.render().destroy();

        expect(cb.mock.calls.length).toEqual(1);
    });

});