import { Component, h } from 'preact';
import { PreactView } from '@viewjs/preact';

export interface HeaderProps {
    title: string;
}

export class Header extends Component<HeaderProps, any> {

    render() {
        return <div>
            <h2>{this.props.title}</h2>
            <ul class="menu">
                <li><a href="">Blog</a></li>
                <li><a href="/create">Create</a>e</li>
            </ul>
        </div>
    }


}


export function create(model: HeaderProps) {
    return new PreactView(Header, model);
}