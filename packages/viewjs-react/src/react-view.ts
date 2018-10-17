import { TemplateView } from '@viewjs/view';
import { ReactRenderer, ComponentType } from './react-renderer'


export class ReactView<P, S = any> extends TemplateView {
    constructor(Component: ComponentType<P, S>, public model?: P) {
        super();
        this.template = new ReactRenderer<P, S>(Component)
    }
}
