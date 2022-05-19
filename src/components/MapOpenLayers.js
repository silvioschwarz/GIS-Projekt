import React from "react";
import { Map, View, Proj } from "ol";
import OSM from "ol/source/OSM";
import { getPointResolution, get as getProjection, transform } from "ol/proj";

import "ol/ol.css";
import "../css/MapOL.css";
import data from "../data/Standortverlauf/Semantic Location History/2022/2022_APRIL.json"
import KML from "ol/format/KML";
import { fromLonLat, get } from "ol/proj";

import VectorSource from "ol/source/Vector";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import GeoJSON from 'ol/format/GeoJSON';

import geojsonObject from '../data/history-2022-05-01.json'
// import dataKML from '../data/history-2022-05-01.kml';
export default class MapOpenLayers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      center: [24.0315, 49.8419],
      zoom: 16,
    };
  }


  componentDidMount() {
    const osm = new TileLayer({
      source: new OSM(),
    });

    // console.log(geojsonObject);


    const vectorKml = new VectorLayer({
      source: new VectorSource({
        url:'../data/history-2022-05-01.kml',
        format: new KML(),
      }),
      zIndex:1000
    });

    // console.log(vectorKml)

    const geojsonObj = new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(geojsonObject,
        {
          featureProjection: get("EPSG:3857"),
        }),
      }
      ),
      zIndex:100
    });

    //  console.log(geojsonObj)


    const map = new Map({
      layers: [geojsonObj, osm],
      target: document.getElementById("map-OpenLayers"),
      view: new View({
        center: transform([13.04, 52.395], "EPSG:4326", "EPSG:3857"),
        projection: 'EPSG:3857',
        zoom: 15,
      }),
    });
  }

  render() {
    return (
      <div
        style={{ height: "50vh", width: "40%" }}
        id="map-OpenLayers"
        className="mapOL"></div>
    );
  }
}
