import * as React from "react";
import styled from "styled-components";
import { Button } from "./Button";

const StyledHeader = styled.h1`
    color: red;
`;

export interface HeaderProps {
    text: string;
}

export const Header: React.SFC<HeaderProps> = (props) => <StyledHeader>{props.text}<Button /></StyledHeader>;
Header.displayName = "Header";
