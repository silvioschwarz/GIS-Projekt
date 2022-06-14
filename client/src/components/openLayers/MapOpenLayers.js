import React, { useState } from "react";
// import './App.css';
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style";
import { osm, vector } from "./Source";
import { fromLonLat, get, transform } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { getCenter } from "ol/extent";
import {getArea, getLength} from 'ol/sphere';

import { Controls, FullScreenControl, OverviewMapControl } from "./Controls";

import * as turf from '@turf/turf'

// attributation: https://github.com/mbrown3321/openlayers-react-map

let styles = {
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "blue",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
  Line: new Style({
    stroke: new Stroke({
      color: "red",
      width: 5,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
  LineGreen: new Style({
    stroke: new Stroke({
      color: "green",
      width: 5,
    }),
    fill: new Fill({
      color: "rgba(0, 255, 0, 0.1)",
    }),
  }),
};

const MapOpenLayers = (props) => {
  const [center, setCenter] = useState([13.03, 52.38]);
  const [zoom, setZoom] = useState(14);

  // console.log("data passed to vectorlayer")
  // console.log(props.data.features[0].geometry.coordinates);

  const points = [];
  const lines = [];

  // console.log(props.data)

  props.data.features.map((feature) => {
    // console.log(feature);

    if (feature.geometry.type === "Point") {
      points.push(...feature.geometry.coordinates);
    } else if (feature.geometry.type === "LineString") {
      lines.push(...feature.geometry.coordinates);
    }
  });
  // console.log("data from features");
  // console.log(lines)

  let linesGeojson = {
    type:"Feature",
    geometry:{
      type:"LineString",
      coordinates:lines
    },
    properties:{name:"test"}
    }

    const geojsonfeature = new GeoJSON().readFeatures(linesGeojson, {
      featureProjection: get("EPSG:3857"),
    })

    // console.log(getLength(geojsonfeature[0].values_.geometry))
    React.useEffect(()=>{
      setCenter( turf.centroid(props.data).geometry.coordinates)
      // setCenter(getCenter(geojsonfeature[0].getGeometry().transform('EPSG:3857', 'EPSG:4326').getExtent()))
    },[])

//     var center1 = turf.center(props.data).geometry.coordinates
//  console.log(center1)
//  console.log(center)
let geojsonExtent = geojsonfeature[0].getGeometry().getExtent();
// console.log(geojsonExtent)
  
  return (
    <div className="map-container">
      <Map center={fromLonLat(center)} zoom={zoom} extent={geojsonExtent}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {props.showLayer1 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(props.data, {
                  featureProjection: get("EPSG:3857"),
                }),
              })}
              style={styles.Line}
            />
          )}
          {props.showLayer2 && (
            <VectorLayer
              source={vector({
                features: geojsonfeature
              })}
              style={styles.LineGreen}
            />
          )}
        </Layers>
        <Controls>
          <FullScreenControl />
          <OverviewMapControl source={osm()} />
        </Controls>
      </Map>
    </div>
  );
};
export default MapOpenLayers;
