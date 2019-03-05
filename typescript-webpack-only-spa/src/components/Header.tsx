import * as React from "react";
import { hot } from "react-hot-loader";
import styled from "styled-components";

const StyledHeader = styled.h1`
  font-size: 3rem;
  font-weight: 300;
  margin: 1rem;
`;

export interface HeaderProps {
  text: string;
}

const RawHeader: React.SFC<HeaderProps> = (props) => (
  <StyledHeader>{props.text}</StyledHeader>
);

export const Header = hot(module)(RawHeader);
