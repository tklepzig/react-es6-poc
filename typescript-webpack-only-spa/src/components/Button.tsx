import * as React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: #cc6e06;
  font-size: 1.5rem;
  border: none;
  padding: 0.5rem 1rem;
  margin: 1rem;
  border-radius: 0.3rem;
  cursor: pointer;
`;

export const Button: React.FunctionComponent = ({ children }) => {
  const onClick = () => {
    alert("Click!");
  };

  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};
