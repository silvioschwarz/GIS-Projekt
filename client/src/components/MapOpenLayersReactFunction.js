// react
import React, { useState, useEffect, useRef } from "react";

// openlayers
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { transform } from "ol/proj";
import { toStringXY } from "ol/coordinate";
import OSM from "ol/source/OSM";
import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat, get } from "ol/proj";
import { Fill, Stroke, Style } from "ol/style";

export default function MapOpenLayersReact(props) {
  const [geoJSONData, setGeoJSONData] = useState([]);

  const [port, setPort] = useState(4000);

  // set intial state
  const [map, setMap] = useState();
  const [featuresLayer, setFeaturesLayer] = useState();
  const [selectedCoord, setSelectedCoord] = useState();

  // pull refs
  const mapElement = useRef();

  // create state ref that can be accessed in OpenLayers onclick callback function
  //  https://stackoverflow.com/a/60643670
  const mapRef = useRef();
  mapRef.current = map;

  // initialize map on first render - logic formerly put into componentDidMount
  useEffect(() => {
    const osm = new TileLayer({
      source: new OSM(),
    });

    // // console.log(vectorKml)
    // const geoData = require("../data/GeoJSON/2022-05-20.json");
    // console.log("geodata")
    // console.log(geoData)

    // const geojsonObj = new VectorLayer({
    //   source: new VectorSource({
    //     features: new GeoJSON().readFeatures(geoData, {
    //       featureProjection: get("EPSG:3857"),
    //     }),
    //   }),
    //   style: new Style({
    //     stroke: new Stroke({
    //       color: "blue",
    //       width: 3,
    //     }),
    //     fill: new Fill({
    //       color: "rgba(0, 0, 255, 0.1)",
    //     }),
    //   }),
    //   zIndex: 100,
    // });

    // create and add vector source layer
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
    });

    // create map
    const initialMap = new Map({
      target: mapElement.current,
      layers: [osm],
      view: new View({
        center: transform([13.035, 52.397], "EPSG:4326", "EPSG:3857"),
        projection: "EPSG:3857",
        zoom: 14,
      }),
      controls: [],
    });

    // save map and vector layer references to state
    setMap(initialMap);
    setFeaturesLayer(initalFeaturesLayer);
  }, []);



  const getGeoJSONData = async() => {
    try {
      const response = await fetch(`http://localhost:${port}/getGeoJSON`);

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      const geojsondata = result[0]["geojson"];
      console.log("inside function");
      console.log(geojsondata);
      // console.log(geojsondata);
      setGeoJSONData(geojsondata);
     

    } catch (err) {
      console.log(err);
    }
  }

  // useEffect(() => {
  //   getGeoJSONData();
  //   console.log("lasteffect")
  //   console.log(geoJSONData)

  //   const geojsonObj = new VectorLayer({
  //     source: new VectorSource({
  //       features: new GeoJSON().readFeatures(geoJSONData, {
  //         featureProjection: get("EPSG:3857"),
  //       }),
  //     }),
  //     style: new Style({
  //       stroke: new Stroke({
  //         color: "blue",
  //         width: 3,
  //       }),
  //       fill: new Fill({
  //         color: "rgba(0, 0, 255, 0.1)",
  //       }),
  //     }),
  //     zIndex: 100,
  //   });

  // },[]);


  // render component
  return (
    <div
      style={{ height: "50vh", width: "40%" }}
      ref={mapElement}
      className="map-container"
    ></div>
  );
}
