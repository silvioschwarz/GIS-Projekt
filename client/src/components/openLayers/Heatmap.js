import React, { useState } from "react";
// import './App.css';
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style";
import { osm, vector } from "./Source";
import { fromLonLat, get, transform } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { getCenter } from "ol/extent";
import { getArea, getLength } from "ol/sphere";

import HeatmapLayer from "./Layers/HeatmapLayer";

import { Controls, FullScreenControl, OverviewMapControl } from "./Controls";

import * as turf from "@turf/turf";

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

const Heatmap = (props) => {
  const [center, setCenter] = useState([13.03, 52.38]);
  const [zoom, setZoom] = useState(14);

  const [heatmapData, setHeatmapData] = React.useState([]);

  var heatmap_data = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [13.03, 52.38],
        },
        properties: { title: "HeatmapPts", id: 111, name: "sample 1" },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [13.03, 52.38],
        },
        properties: { title: "HeatmapPts", id: 222, name: "sample 2" },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [13.03, 52.38],
        },
        properties: { title: "HeatmapPts", id: 333, name: "sample 3" },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [13.03, 52.38],
        },
        properties: { title: "HeatmapPts", id: 444, name: "sample 4" },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [13.03, 52.38],
        },
        properties: { title: "HeatmapPts", id: 555, name: "sample 5" },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [13.03, 52.38],
        },
        properties: { title: "HeatmapPts", id: 666, name: "sample 6" },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [13.03, 52.38],
        },
        properties: { title: "HeatmapPts", id: 777, name: "sample 7" },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [13.03, 52.38],
        },
        properties: { title: "HeatmapPts", id: 888, name: "sample 8" },
      },
    ],
  };

  const port = 4000;

  React.useEffect(()=>{
    fetch(`http://localhost:${port}/getGeoJSON/`)
      .then((res) => {
        console.log("fetched!");
        if (!res.ok) {
          throw new Error("Network response was not OK");
        }
        return res.json();
      })
      .then((data) => {
        // console.log("here is data")
        // console.log(data)
        setHeatmapData(data)
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  },[])
  

  console.log(heatmap_data)
  console.log(heatmapData[0])

  return (
    <div className="heatmap-container">
      <Map center={fromLonLat(center)} zoom={zoom} >
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {
            <HeatmapLayer
              source={vector({
                features: new GeoJSON().readFeatures(heatmap_data, {
                    featureProjection: get("EPSG:3857"),
                }),
              })}
              blur={9}
              radius={10}
              weight={function (feature) {
                return 10;
              }}
              //   style={styles.Line}
            />
          }
        </Layers>
        <Controls>
          <FullScreenControl />
          <OverviewMapControl source={osm()} />
        </Controls>
      </Map>
    </div>
  );
};
export default Heatmap;
