import { Header } from "@components/Header";
import { GlobalStyle } from "@styles/global";
import * as React from "react";
import * as ReactDOM from "react-dom";

ReactDOM.render((
    <>
        <Header text="Test" />
        <GlobalStyle />
    </>),
    document.getElementById("root"));
