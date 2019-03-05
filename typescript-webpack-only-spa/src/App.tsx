import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { GlobalStyle } from "@styles/global";
import * as React from "react";
import { hot } from "react-hot-loader";

const RawApp: React.FunctionComponent = () => (
  <>
    <Header text="React Skeleton" />
    <Button>Click</Button>
    <GlobalStyle />
  </>
);

export const App = hot(module)(RawApp);
