import { Router, HistoryAPI, HistoryProvider, RouterView, Context, PathChangeEvent } from '@viewjs/router';
import { IView } from '@viewjs/view';
import { global, singleton } from '@viewjs/di';
import { BlogCollection } from './models';

@singleton()
export class AppRouter extends RouterView<Context> {
    constructor() {
        super({
            router: new Router(new HistoryAPI(HistoryProvider.Fragment, window.location.pathname))
        })

        this
            .registerRoute('/', {
                view: () => import('./blog-list').then(mod => {
                    const v = global().get<IView>(mod.BlogListView);
                    (v as any).collection!.load()
                    return v;
                }),
            })
            .registerRoute("/create", {
                view: (ctx) => import('./blog-form').then(mod => global().get<IView>(mod.BlogFormView))
            })
            .registerRoute("/update/:blogId", {
                view: ctx => {
                    return import('./blog-form')
                        .then(mod => {
                            const form = global().get<any>(mod.BlogFormView)

                            const col = global().get<BlogCollection>(BlogCollection)
                            col.load();
                            form.model = col.find(m => m.id == ctx.params.blogId)!

                            return form;
                        });

                }
            });
    }
}

// function nextRoute(router: Router) {
//     const o = new Observer()
//     const onPath = (path: PathChangeEvent) => {
//         o.next(path.value);
//     }

//     router.history.on(PathChangeEvent, onPath);

//     return o.subscriber();
// }