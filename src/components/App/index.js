import React, { Component } from "react";
import "./app.scss";

import EditRoute from '../EditRoute'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app__wrap">
          <EditRoute />
        </div>
      </div>
    );
  }
}
export default App;