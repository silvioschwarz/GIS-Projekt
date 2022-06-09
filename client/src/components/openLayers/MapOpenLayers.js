import React, { useState } from "react";
// import './App.css';
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { osm, vector } from "./Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl, OverviewMapControl } from "./Controls";

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
};


const MapOpenLayers = (props) => {
  const [center, setCenter] = useState([13.035, 52.397]);
  const [zoom, setZoom] = useState(14);
  const [showLayer2, setShowLayer2] = useState(true);

  console.log(props.data);

  return (
    <div className="map-container">
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {props.showLayer && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(props.data, {
                  featureProjection: get("EPSG:3857"),
                }),
              })}
              style={styles.Line}
            />
          )}
          {/* {showLayer2 && (
          <VectorLayer
            source={vector({ features: new          GeoJSON().readFeatures(geojsonObject2, { featureProjection:               get('EPSG:3857') }) })}
            style={styles.MultiPolygon}
          />
        )} */}
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
