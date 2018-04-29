import * as React from "react";
import * as ReactDOM from "react-dom";
import "./app.scss";
import { Header } from "./components/Header";

ReactDOM.render(<Header text="Hello React!" />,
    document.getElementById("root"));
