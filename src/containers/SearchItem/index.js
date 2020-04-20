import React, { Component } from "react";
import './searchItem.scss'

class SearchItem extends Component {

  state = {
  }

  render() {
    return (
      <div className="search-item">
        <p>{this.props.value.address}</p>
        <div className="search-item__remove">
          <div className="remove__icon" id={`search-item-${this.props.item}`} onClick={this.props.removeSearchItem}></div>
        </div>
      </div>
    );
  }
}
export default SearchItem;