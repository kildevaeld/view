import 'reflect-metadata';
import '@viewjs/builder';
import { TemplateView, event, DelegateEvent } from '@viewjs/view';
import { withAttachment, attachments } from '@viewjs/attach';
import { global } from '@viewjs/di';
import { setInvoker } from '@viewjs/utils';
import { AppRouter } from './routes';
import { create as createHeader } from './header';
import { create as createFooter } from './footer';
import { PreactView } from '@viewjs/preact';

setInvoker(global())

@attachments({
    header: {
        view: () => createHeader({ title: 'Blog 2' }),
        selector: '.header',
        name: 'header'
    },
    footer: {
        view: createFooter,
        selector: '.footer',
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
    <div class="container"></div>
    <div>
        <section class="footer"></footer>
    </div>
    `;


    @event.click('.menu li a')
    onMenuItem(e: DelegateEvent) {
        e.preventDefault()
        this.attachView('routerView')!.getInstance<AppRouter>().router.navigate(e.delegateTarget!.getAttribute('href')!)
    }

    viewDidAttach(name: string, view: any) {
        if (name == 'footer') {
            (view as PreactView<any, any>).model = { title: 'test' }
            setTimeout(() => {
                (view as PreactView<any, any>).model = { title: 'test 2' }
                view.render();
            }, 1000);
        }
    }



}



class UnderApp extends Application {
    onMenuItem(e: DelegateEvent) {
        super.onMenuItem(e);
    }
}

window.onload = () => {

    try {
        const view = global().get<Application>(UnderApp);
        view.el = document.body
        view.render();
    } catch (e) {
        console.error(e)
    }
}
