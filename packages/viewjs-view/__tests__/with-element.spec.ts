import { withElement, View } from '../src';


describe("WithElement", () => {

    it('should create element', () => {
        let view = new (withElement(View));
        expect(view.el).not.toBeNull();
    });

    it('should default to div tag', () => {
        let view = new (withElement(View));
        expect(view.el!.tagName).toEqual("DIV");
    });

    it('should use custom tag', () => {
        let view = new (withElement(View))({
            tagName: 'span'
        });
        expect(view.el!.tagName).toEqual("SPAN");
    });

    it('should  set classes on element', () => {
        let view = new (withElement(View))({
            className: 'test class'
        });
        expect(view.el!.getAttribute('class')).toEqual("test class");
    });

    it('should remove element from dom', () => {
        let view = new (withElement(View))();

        var el = document.createElement('div');
        el.appendChild(view.render().el!);

        view.remove();
        expect(el.children.length).toEqual(0);


    });

});