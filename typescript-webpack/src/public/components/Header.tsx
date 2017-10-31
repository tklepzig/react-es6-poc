import * as React from "react";

export interface IHeaderProps {
    text: String;
}

export const Header: React.SFC<IHeaderProps> = props => <h1>{props.text}</h1>;
Header.displayName = "Header";


