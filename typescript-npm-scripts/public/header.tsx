import * as React from "react";

interface HeaderProps {
    text: String;
}
export const Header: React.SFC<HeaderProps> = ({ text }) => <h1>{text}</h1>;