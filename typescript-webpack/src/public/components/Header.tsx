import Button from "@components/Button";
import * as React from "react";

export interface IHeaderProps {
    text: string;
}

export const Header: React.SFC<IHeaderProps> = (props) => <h1>{props.text}<Button /></h1>;
Header.displayName = "Header";
