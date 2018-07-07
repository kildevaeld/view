const vn = viewjs.view;

describe("WithElement", () => {

    it('should create element', () => {
        let view = new(vn.withElement(vn.View));
        expect(view.el).to.not.eql(null);
    });

    it('should default to div tag', () => {
        let view = new(vn.withElement(vn.View));
        expect(view.el.tagName).to.equal("DIV");
    });

    it('should use custom tag', () => {
        let view = new(vn.withElement(vn.View))({
            tagName: 'span'
        });
        expect(view.el.tagName).to.equal("SPAN");
    });

    it('should  set classes on element', () => {
        let view = new(vn.withElement(vn.View))({
            className: 'test class'
        });
        expect(view.el.getAttribute('class')).to.equal("test class");
    });

});