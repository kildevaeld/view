import { normalize, html } from '../src';

describe('Query', () => {

    it('basic', () => {
        let out = normalize('body');
        expect(out.length).toEqual(1);
        expect(out[0]).toEqual(document.body);
    });

    it('', () => {
        const context = document.createElement('div');
        context.innerHTML = `<div bind="name"></div><button>Rapper</button>`;

        // let out = normalize('button', context);
        // console.log(viewjs.html.normalize(document))
    });

    it('should create element', () => {
        let el = normalize('<div class="test"></div>');
        expect(el.length).toEqual(1);
        expect(el[0]).toBeInstanceOf(HTMLElement);
    });

    it('should be a ierator', () => {
        const context = document.createElement('div');
        context.innerHTML = `<div>
            <button class="btn1"></button>
            <button class="btn2"></button>
            <button class="btn3"></button>
        </div>`;

        let $e = html('button', context);

        let iter = $e[Symbol.iterator]();

        expect(iter.next().value).not.toEqual(null);
        expect(iter.next().value).not.toEqual(null);
        expect(iter.next().value).not.toEqual(null);
        expect(iter.next().value).toEqual(null);

    })

    it('should flattern html', () => {
        const context = document.createElement('div');
        context.innerHTML = `<div>
            <button class="btn1"></button>
            <button class="btn2"></button>
            <button class="btn3"></button>
        </div>`;


        let e1 = html('.btn1', context),
            e2 = html('.btn2', context);

        let e3 = html([e1, e2]);
        expect(e1.get(0)).toEqual(e3.get(0));
        expect(e2.get(0)).toEqual(e3.get(1));

    });

});