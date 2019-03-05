import { Header } from "@components/Header";
import { GlobalStyle } from "@styles/global";
import * as React from "react";
import { hot } from "react-hot-loader";

const RawApp: React.FunctionComponent = () => (
  <>
    <Header text="Test11" />
    <GlobalStyle />
  </>
);

export const App = hot(module)(RawApp);
