import * as React from "react";
import { hot } from "react-hot-loader";
import styled from "styled-components";
import { Button } from "./Button";

const StyledHeader = styled.h1`
  color: blue;
`;

export interface HeaderProps {
  text: string;
}

const RawHeader: React.SFC<HeaderProps> = (props) => (
  <StyledHeader>
    {props.text}
    <Button />
  </StyledHeader>
);
RawHeader.displayName = "Header";

export const Header = hot(module)(RawHeader);
