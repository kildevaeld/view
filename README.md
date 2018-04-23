# view


## Usage

```typescript

import {View, withTemplate, event} from 'view';


interface Model {
  header: string;
  body: string;
}


class Feature extends withTemplate<Model>(View) {

  template = (data:Model) => `
    <h1>${data.header}</h1>
    <p>${data.body}</p>
    <button>Click</button>
  `;
  
  
  @event.click('button')
  onClick(e:MouseEvent) {
    alert('click on button ' + this.model.header);
  }

}


new Feature({
  el: document.body,
  model: {
    header: "This is view",
    body: "This is view with a template"
  }
}).render();



```
