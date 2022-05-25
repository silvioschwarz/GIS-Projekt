import React from "react";
import { Map, View, Proj } from "ol";
import OSM from "ol/source/OSM";
import { transform } from "ol/proj";

import KML from "ol/format/KML";
import { fromLonLat, get } from "ol/proj";

import VectorSource from "ol/source/Vector";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import GeoJSON from "ol/format/GeoJSON";

import { Fill, Stroke, Style } from "ol/style";

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
    const osm = new TileLayer({
      source: new OSM(),
    });

    // console.log(geojsonObject);

    const vectorKml = new VectorLayer({
      source: new VectorSource({
        url: "../data/KML/history-2022-05-20.kml",
        format: new KML(),
      }),
      zIndex: 1000,
    });

    // console.log(vectorKml)
    const geoData = require("../data/GeoJSON/2022-05-20.json");

    const geojsonObj = new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(geoData, {
          featureProjection: get("EPSG:3857"),
        }),
      }),
      style: new Style({
        stroke: new Stroke({
          color: "blue",
          width: 3,
        }),
        fill: new Fill({
          color: "rgba(0, 0, 255, 0.1)",
        }),
      }),
      zIndex: 100,
    });

    var postgreSource = new VectorSource();

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "../php/getGeoJSON.php",
      success: function (data) {
        console.log(data);
        var geojson = jQuery.parseJSON(data);
        var format = new ol.format.GeoJSON();
        var features = format.readFeatures(geojson, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        });
        postgreSource.addFeatures(features);
      },
    });

    const postgreObj = new VectorLayer({
      postgreSource,
      style: new Style({
        stroke: new Stroke({
          color: "blue",
          width: 3,
        }),
        fill: new Fill({
          color: "rgba(0, 0, 255, 0.1)",
        }),
      }),
      zIndex: 100,
    });

    console.log("postgres");
    console.log(postgreSource);

    // console.log(geoData)

    // const geojsonURL = new VectorLayer({
    //   source: new VectorSource({
    //     format: new GeoJSON({featureProjection: "EPSG:3857"}),
    //     url: '../data/history-2022-05-20.json',
    //   }),
    //   zIndex: 100,
    // });

    // console.log(geojsonURL.values_.source.uidIndex_)
    // console.log(geojsonObj.values_.source.uidIndex_)

    const map = new Map({
      layers: [geojsonObj, osm],
      target: document.getElementById("map-OpenLayers"),
      view: new View({
        center: transform([13.035, 52.397], "EPSG:4326", "EPSG:3857"),
        projection: "EPSG:3857",
        zoom: 14,
      }),
    });
  }

  render() {
    return (
      <div
        style={{ height: "50vh", width: "40%" }}
        id="map-OpenLayers"
        className="mapOL"
      ></div>
    );
  }
}
