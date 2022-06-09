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

// const geojsonObject = require("../../data/GeoJSON/2022-05-20.json");
// // let datum = document.getElementById("test-date").value
// // console.log(datum)

const port = 4000;
// const geojsonObject2 = await fetch(`http://localhost:${port}/getGeoJSON`)
//   .then((res) => {
//     if (!res.ok) {
//       throw new Error("Network response was not OK");
//     }
//     return res.json();
//   })
//   .then((data) => data[0]["geojson"])
//   .catch((error) => {
//     console.error("There has been a problem with your fetch operation:", error);
//     return geojsonObject;
//   });

const MapOpenLayers = () => {
  const [center, setCenter] = useState([13.035, 52.397]);
  const [zoom, setZoom] = useState(14);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);

  const [datum, setDatum] = React.useState("2022-05-01");

  const [geoJSONObject, setGeoJSONObject] = useState(
    require("../../data/GeoJSON/2022-05-20.json")
  );

  console.log(geoJSONObject);

  // TODO: rerender on data change!

  React.useEffect(() => {
    fetch(`http://localhost:${port}/getGeoJSON/${datum}`)
      .then((res) => {
        setShowLayer1(prevState => !prevState)
        console.log("fetched!");
        if (!res.ok) {
          throw new Error("Network response was not OK");
        }
        return res.json();
      })
      .then((data) => {
        setGeoJSONObject(data[0]["geojson"])
        setShowLayer1(prevState => !prevState)
    })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, [datum]);

  function handleDatum() {
    let newDatum = document.getElementById("test-date").value;
    setDatum(newDatum);
  }

  const doFetchDownload = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(resp => resp.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // the filename you want
        a.download = "todo-1.json";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alert("your file has downloaded!"); // or you know, something with better UX...
      })
      .catch(() => alert("oh no!"));
  };
  

  return (
    <div>
      <label htmlFor="test-date">Tag wählen: </label>
      <input
        type="date"
        name="datum"
        id="test-date"
        value={datum}
        onChange={handleDatum}
      />
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {showLayer1 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geoJSONObject, {
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
      <div>
        <input
          type="checkbox"
          checked={showLayer1}
          onChange={(event) => setShowLayer1(event.target.checked)}
        />{" "}
        Show Path
      </div>
    </div>
  );
};
export default MapOpenLayers;
