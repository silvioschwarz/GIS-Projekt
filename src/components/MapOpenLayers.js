import React from "react";
import { Map, View, Proj } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { getPointResolution, get as getProjection, transform } from "ol/proj";

import "ol/ol.css";
import "../css/MapOL.css";

export default class MapOpenLayers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [24.0315, 49.8419],
      zoom: 16,
    };
  }

  componentDidMount() {
    new Map({
      target: "map-container",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: transform([13.4, 52.51404], "EPSG:4326", "EPSG:3857"),
        zoom: 10,
      }),
    });
  }

  render() {
    return (
      <div
        style={{ height: "50vh", width: "50%" }}
        id="map-container"
        className="mapOL"
      />
    );
  }
}
