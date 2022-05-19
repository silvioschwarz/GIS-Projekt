import React,{ Component } from "react"
import L from "leaflet";
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import "../css/MapLeaflet.css";

import geojsonObject from '../data/history-2022-05-01.json'


export default class MapLeaflet extends Component { 
    // geojsonObject.map()

  componentDidMount() {
    // create map
    this.map = L.map("map-Leaflet", {
      center: [52.395,13.04],
      zoom: 15,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });

    // console.log(geojsonObject)
    // L.GeoJSON(geojsonObject);

    // add marker
    // this.marker = L.marker(this.props.markerPosition).addTo(this.map);
  }
  // componentDidUpdate({ markerPosition }) {
  //   // check if position has changed
  //   if (this.props.markerPosition !== markerPosition) {
  //     this.marker.setLatLng(this.props.markerPosition);
  //   }
  // }
  render() {
    return <div id="map-Leaflet"></div>;
  }
}