import React, { Component } from "react";
import L from "leaflet";
import {
  Map,
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "../css/MapLeaflet.css";
import geojsonObject from "../data/history-2022-05-01.json";

export default function MapLeaflet() {

  function PointSwitch(item) {
    if (item.geometry.type == "Point") {
      return (
        <Marker
          key={item.properties.begin}
          position={[
            item.geometry.coordinates[1],
            item.geometry.coordinates[0],
          ]}
        />
      );
    } else if (item.geometry.type == "LineString") {
      let coordlatlon = item.geometry.coordinates.map((coords) => [
        coords[1],
        coords[0],
      ]);

      return <Polyline key={item.properties.begin} positions={coordlatlon} />;
    }
  }



  return (
    <MapContainer center={[52.393, 13.035]} zoom={14} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {geojsonObject.features.map((geojsonobj) =>
        // console.log(geojsonobj)
        PointSwitch(geojsonobj)
      )}
    </MapContainer>
  );

  // componentDidMount() {
  //   // create map
  //   this.map = L.map("map-Leaflet", {
  //     center: [52.395, 13.04],
  //     zoom: 14,
  //     layers: [
  //       L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  //         attribution:
  //           '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  //       }),
  //     ],
  //   });

  //   console.log(geojsonObject);
  //   L.geoJSON(geojsonObject).addTo(this.map);
  // }

  // render() {
  //   return <div id="map-Leaflet"></div>;
  // }
}
