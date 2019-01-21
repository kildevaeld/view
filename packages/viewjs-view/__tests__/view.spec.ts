import { View } from '../src';
import $ from 'jquery';

describe('View', function () {

    it('should instantiate', () => {


        const view = new View();
        expect(view.el).toEqual(void 0);
        expect(view.options).not.toBeNull();
        expect(Object.keys(view.options).length).toEqual(0);
        expect(view.vid).not.toBeNull();
        expect(typeof view.vid === 'string').toEqual(true);

    });

    it('should hook up events from events map', () => {

        const cb1 = jest.fn(),
            cb2 = jest.fn(),
            cb3 = jest.fn(),
            cb4 = jest.fn()

        const el = document.createElement('div');
        el.innerHTML = `
            <button class="btn1"></button>
            <button class="btn2"></button>
            <button class="btn3"></button>
        `;

        const view = new View({
            el: el
        });

        (view as any).onClick = cb2;
        (view as any).onClick2 = cb4;

        view.events = {
            'click button.btn1': cb1,
            'click button.btn2': 'onClick',
            'click button.btn3': [cb3, 'onClick2']
        }

        view.render();

        $(view.el!).find('.btn1').click();
        $(view.el!).find('.btn2').click();
        $(view.el!).find('.btn3').click();

        expect(cb1.mock.calls.length).toEqual(1);
        expect(cb2.mock.calls.length).toEqual(1);
        expect(cb3.mock.calls.length).toEqual(1);
        expect(cb4.mock.calls.length).toEqual(1);

    });


});