import * as React from 'react';
import { ReactView } from '@viewjs/react';

export interface HeaderProps {
    title: string;
}

export class Header extends React.Component<HeaderProps, any> {

    render() {
        return <div>
            <h2>{this.props.title}</h2>
            <ul className="menu">
                <li><a href="">Blog</a></li>
                <li><a href="/create">Create</a>e</li>
            </ul>
        </div>
    }


}


export function create(model: HeaderProps) {
    return new ReactView(Header, model);
}