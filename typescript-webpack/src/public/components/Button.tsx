import * as React from "react";
import { bind } from "react.ex";

export default class App extends React.Component {

    public render() {
        return <button onClick={this.onClick}>Click</button>;
    }

    @bind
    private onClick() {
        // tslint:disable-next-line:no-console
        console.dir(this);
        alert("Click!");
    }
}
