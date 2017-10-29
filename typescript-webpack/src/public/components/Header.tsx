import * as React from "react";

export interface HeaderProps {
    text: String;
}

export const Header: React.SFC<HeaderProps> = props => <h1>{props.text}</h1>;





