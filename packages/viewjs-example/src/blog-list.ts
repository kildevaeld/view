import { TemplateView, event, DelegateEvent, withElement, attributes } from '@viewjs/view';
import { withCollection } from '@viewjs/collection';
import { BlogEntry, BlogCollection } from './models';
import { autoinject, global } from '@viewjs/di';
import { AppRouter } from './routes';
import { Constructor } from '@viewjs/utils';

@attributes({
    tagName: 'section'
})
class BlogListItemView extends withElement<Constructor<TemplateView<BlogEntry>>>(TemplateView) {
    template = () => `<div data-id="${this.model!.id}">
        <h2>${this.model!.title}</h2>
        <p>${this.model!.body}</p>
    </div>`
}

@autoinject
export class BlogListView extends withCollection(TemplateView, BlogListItemView, BlogCollection) {
    template = () => `
        <h1>Entries</h1>
        <div class="blog-list">
        </div>
    `;
    childViewContainer = '.blog-list';

    @event.click('[data-id]')
    onItemClick(e: DelegateEvent) {
        const id = e.delegateTarget!.getAttribute('data-id')!
        global().get<AppRouter>(AppRouter).router.navigate('/update/' + id)
    }

}

