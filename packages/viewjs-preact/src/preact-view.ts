import { TemplateView } from '@viewjs/view';
import { PreactRenderer, ComponentType } from './preact-renderer'

export class PreactView<P, S = any> extends TemplateView {
    constructor(Component: ComponentType<P, S>, public model?: P) {
        super();
        this.template = new PreactRenderer<P, S>(Component)
    }
}