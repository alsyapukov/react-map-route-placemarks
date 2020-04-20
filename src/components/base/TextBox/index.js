import React, { Component } from "react";
import './textBox.scss'

class TextBox extends Component {

  state = {
    value: ""
  }

  changeValue = (e) => {
    this.setState({ value: e.target.value });
    this.props.changeValue(e.target.value);
  }

  render() {
    return (
      <div className="textbox">
        <input
          className="textbox__inner"
          type="text"
          value={this.state.value}
          onChange={this.changeValue}
          onKeyPress={this.props.onKeyPress}
        />
      </div>
    );
  }
}
export default TextBox;