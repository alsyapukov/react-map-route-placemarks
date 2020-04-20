import React, { Component } from "react";
import "./yandexMap.scss";

class YandexMap extends Component {

  state = {
    apiKey: 'c0bc84b6-7dec-45b4-be8a-85945e742d4b',
    lang: 'ru_RU',
    version: '2.1',
    coordorder: 'latlong',
    debug: false,
    myMap: null,
    isLoad: false,
    id: 'yandexMap'
  }

  componentDidMount() {
    const mode = this.state.debug ? 'debug' : 'release';
    const settingsPart = `lang=${this.state.lang}${this.state.apiKey && `&apikey=${this.state.apiKey}`}&mode=${mode}&coordorder=${this.state.coordorder}`;
    const link = `https://api-maps.yandex.ru/${this.state.version}/?${settingsPart}`;
    const isLoadedScript = document.querySelector(`script[src*="${link}"]`)
    if (isLoadedScript) {
      this.init()
    } else {
      const yandexMapScript = document.createElement('script');
      yandexMapScript.setAttribute('src', link);
      yandexMapScript.setAttribute('defer', '');
      document.body.appendChild(yandexMapScript);
      yandexMapScript.onload = () => {
        ymaps.ready(() => {
          this.init()
        });
      };
    }
  }

  init = () => {
    this.state.myMap = new ymaps.Map('yandexMap', {
      center: [55.753215, 37.622504],
      zoom: 13,
      controls: []
    });

    this.state.myMap.container.fitToViewport();

    this.state.myMap.controls
      .add(
        'zoomControl',
        {
          position: {
            right: '15px',
            top: '15px'
          },
          size: 'small'
        }
      );
    this.props.initMyMap(this.state.myMap);
    this.setState({ isLoad: true })
  }

  render() {
    return (
      <div className="yandex-map">
        <div id={this.state.id}>
          { !this.state.isLoad && <div className="yandex-map__loading"></div> }
        </div>
      </div>
    );
  }
}
export default YandexMap;