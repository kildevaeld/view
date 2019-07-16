import * as Preact from 'preact';
import { PreactView } from '@viewjs/preact';

const React = { createElement: Preact.h }


export interface FooterProps {
    title: string;
}

export class Footer extends Preact.Component<FooterProps, any> {



    render() {
        return <div>
            <div>Footer: {this.props.title}</div>
        </div>
    }

}


export function create(model?: FooterProps) {
    return new PreactView(Footer, model);
}