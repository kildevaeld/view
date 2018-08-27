# viewjs.View

Usage


```typescript

import { View, TemplateView } from '@viewjs/view';

const view = new View({
    el: document.body,
    events: {
        'click button': () => alert('clicked')
    }
}).render();

const view2 = new TemplateView({
    template: () => `
        <button class="button1">Click me</button>
        <button class="2">Click me too</button>
    `,
    events: {
        'click .button1': [
            () => console.log('click'), 
            function () { 
                this instanceof TemplateView
            }
        ],
        'click .button2': e => console.log(e.delegateTarget.textContent);
    },
    el: document.createElement('div')
});

view.el.appendChild(view2.render().el);


```


```typescript

import { View, event } from '@viewjs/view';

class MyView extends View {

    @event.keyup('.input', {
        condition: ([e]) => true
    })
    onInput(e) {
        console.log('inpuy)
    }

}

new MyView({el:document.body}).render();


```