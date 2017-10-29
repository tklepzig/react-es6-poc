import * as React from "react";
import * as ReactDOM from "react-dom";
import { Header } from "./components/Header";

const styles = require("./app.scss");

ReactDOM.render(<Header text="Hello React!" />,
    document.getElementById("root"));