import React, { Component } from "react";
import "./editRoute.scss";

import YandexMap from '../../containers/YandexMap';
import Search from '../../containers/Search';

class EditRoute extends Component {

  state = {
    myMap: null
  }

  initMyMap = (val) => {
    this.setState({
      myMap: val
    })
  }

  render() {
    return (
      <div className="edit-route">
        <div className="edit-route__options">
          <Search myMap={this.state.myMap}/>
        </div>
        <div className="edit-route__map">
          <YandexMap initMyMap={this.initMyMap}/>
        </div>
      </div>
    );
  }
}
export default EditRoute;