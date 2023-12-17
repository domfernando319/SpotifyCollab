import { render } from "react-dom";

import React, { Component } from 'react'

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<h1>Testing React Code</h1>)
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
