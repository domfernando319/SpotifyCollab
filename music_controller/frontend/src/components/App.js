// import { render } from "react-dom";
// import HomePage from "./HomePage";
// import React, { Component } from 'react'

// export default class App extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return(
//             <div>
//                 <HomePage />
//             </div>
//         )
//     }
// }

// const appDiv = document.getElementById("app");
// render(<App />, appDiv);
import React from 'react';
import HomePage from './HomePage';

const App = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default App;