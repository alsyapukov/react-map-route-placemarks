import React, { Component } from "react";
import './search.scss'
import TextBox from '../../components/base/TextBox'

import { Search as SearchGeocode } from '../../api'

import SortSearch from '../SortSearch'

class Search extends Component {

  state = {
    value: "",
    searchArray: [],
    polyline: null,
    placemarks: []
  }

  changeValue = (val) => {
    this.setState({ value: val });
  }

  geocoderSearch = (val) => {
    SearchGeocode.getAddress({ geocode: val })
      .then(res => {
        const geoObject = res.data.response.GeoObjectCollection.featureMember[0];
        if (geoObject) {

          let searchValue = {
            address: geoObject.GeoObject.metaDataProperty.GeocoderMetaData.text,
            coords: geoObject.GeoObject.Point.pos.split(' ').map(coord => {
              return Number(coord);
            }).reverse()
          }

          this.setState({
            searchArray: [...this.state.searchArray, searchValue]
          })
          
          this.initPlacemark(searchValue, this.state.searchArray.length - 1);
          this.setCenter();
        }
      })
  }

  handleKeyPress = async(e) => {
    if (e.key === 'Enter') {
      this.geocoderSearch(this.state.value);
    }
  }

  removeSearchItem = (i) => {
    let newArray = this.state.searchArray;

    newArray = newArray.filter((item, index) => index !== i);
    this.setState({
      searchArray: newArray
    })
    this.props.myMap.geoObjects.remove(this.state.placemarks[i]);

    let placemarks = [];
    placemarks = [...placemarks, ...this.state.placemarks];
    placemarks.splice(i, 1);

    this.setState({
      placemarks: placemarks
    })
    if (newArray.length) {
      this.changePolyline(newArray)
    }
  }

  setCenter = () => {
    this.props.myMap.setCenter(
      this.state.searchArray[this.state.searchArray.length - 1].coords
    );
  }

  dragEventMarks = () => {
    this.props.myMap.geoObjects.events.add(['dragend'], (e) => {

      let placemark = e.get('target');
      let coords = e.get('target').geometry.getCoordinates();
      let index = placemark.properties.getAll().index;

      ymaps
        .geocode(coords, {
          results: 1
        })
        .then(res => {
          let firstGeoObject = res.geoObjects.get(0);
          let searchValue = {
            address: firstGeoObject.getAddressLine(),
            coords
          }

          placemark.properties.set('balloonContent', searchValue.address);

          let newArray = this.state.searchArray
            .map((item, i) => index == i ? searchValue : item)
          this.changePolyline(newArray);
          this.changePlacemark(newArray);
          this.setState({
            searchArray: newArray
          })
        });

    });
  }

  initPlacemark = (val, index) => {
    var placemark = new ymaps.Placemark(
      val.coords,
      {
        balloonContent: `${val.address}`,
        index: index
      },
      {
        preset: 'islands#circleDotIcon',
        iconColor: 'blue',
        draggable: true
      }
    );
    this.setState({
      placemarks: [...this.state.placemarks, placemark]
    })

    if (this.state.searchArray.length == 1) {
      this.dragEventMarks();
      this.initPolyline(this.state.searchArray);
      this.changePolyline(this.state.searchArray);
    } else if (this.state.searchArray.length > 1) {
      this.changePolyline(this.state.searchArray);
    }

    this.props.myMap.geoObjects.add(placemark);
  }

  changePlacemark = (newArray) => {
    newArray.map((item, i) => {
      this.state.placemarks[i].geometry.setCoordinates(item.coords);
    })
  }

  initPolyline = (val) => {
    val = val.map(item => {
      return item.coords
    })
    this.setState({
      polyline: new ymaps.Polyline(val, {
        balloonContent: "Route between coordinates"
      }, {
        strokeColor: "#000000",
        strokeWidth: 10,
        strokeOpacity: 0.4
      })
    })
    this.props.myMap.geoObjects.add(this.state.polyline);
  }

  changePolyline = (val) => {
    val = val.map(item => {
      return item.coords
    })
    this.state.polyline.geometry.setCoordinates(val)
  }

  sort = (val) => {
    this.setState({
      searchArray: val
    })
    this.changePlacemark(val);
    this.changePolyline(val);
  }

  render() {
    return (
      <div className="search" >
        <div className="search__textbox">
          <TextBox changeValue={this.changeValue} onKeyPress={this.handleKeyPress} />
        </div>
        <div className="search__list">
          <SortSearch items={this.state.searchArray} sort={(e) => this.sort(e)} removeSearchItem={(e) => this.removeSearchItem(e)} />
        </div>
      </div>
    );
  }
}
export default Search;