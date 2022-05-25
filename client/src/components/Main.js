import React from "react";
// import MapLeaflet from "./MapLeaflet";
import MapOpenLayers from "./MapOpenLayers";
// import MapOpenLayersReact from "./MapOpenLayersReact.js.old";
import MapOpenLayersReact from "./MapOpenLayersReactFunction";

export default function Main() {
  return (
    <main>
      <p>Main Content</p>

      <input type="datetime-local" id="starDate"></input>
      -
      <input type="datetime-local" id="endDate"></input>
      <input type="submit"></input>

      <div className="main-content">
        {/* <MapOpenLayers /> */}
        <MapOpenLayersReact />

      </div>
    </main>
  );
}
