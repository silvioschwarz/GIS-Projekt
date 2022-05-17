import React from "react"
import L from "leaflet";
import "../css/MapLeaflet.css";


export default class MapLeaflet extends React.Component {
  componentDidMount() {
    // create map
    this.map = L.map("map", {
      center: [52.51404,13.4],
      zoom: 16,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });

    // add marker
    // this.marker = L.marker(this.props.markerPosition).addTo(this.map);
  }
  componentDidUpdate({ markerPosition }) {
    // check if position has changed
    if (this.props.markerPosition !== markerPosition) {
      this.marker.setLatLng(this.props.markerPosition);
    }
  }
  render() {
    return <div id="map" />;
  }
}