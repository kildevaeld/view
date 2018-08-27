import 'reflect-metadata';
import '@viewjs/builder';
import { inherit } from '@viewjs/builder';
import { TemplateView, event, DelegateEvent, View } from '@viewjs/view';
import { withAttachment, attachments } from '@viewjs/attach';
import { global } from '@viewjs/di';
import { setInvoker } from '@viewjs/utils';
import { AppRouter } from './routes';


setInvoker(global())

@attachments({
    header: {
        view: () => import('./header').then(m => m.create({ title: 'Blog 2' })),
        selector: '.header',
        name: 'header'
    },
    routerView: {
        view: () => {
            const router = global().get<AppRouter>(AppRouter)
            router.router.history.start();
            return router;
        },
        selector: '.container',
        name: 'routerView'
    }
})
class Application extends withAttachment(TemplateView) {
    template = `<div>
        <header class="header"></header>
    </div>
    <div class="container"></div>`;


    @event.click('.menu li a')
    onMenuItem(e: DelegateEvent) {
        e.preventDefault()
        this.attachView('routerView')!.getInstance<AppRouter>().router.navigate(e.delegateTarget!.getAttribute('href')!)
    }

}



class UnderApp extends Application {
    onMenuItem(e: DelegateEvent) {
        super.onMenuItem(e);
    }
}

window.onload = () => {

    try {
        const view = global().get<Application>(inherit(UnderApp, {}));
        view.el = document.body
        view.render();
    } catch (e) {
        console.error(e)
    }
}
