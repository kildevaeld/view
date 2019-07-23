# @viewjs/modals

```js
import { Manager } from '@viewjs/modals'

const manager = new Manager();

manager.open('Hello, World!', {
    closeOnEscape: true
}).then( id => {
    setTimeout(() => manager.close(id), 2000);
});


```