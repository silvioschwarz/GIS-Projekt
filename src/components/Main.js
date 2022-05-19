import React from "react";
import MapLeaflet from "./MapLeaflet";
import MapOpenLayers from "./MapOpenLayers";

export default function Main() {
  return (
    <div>
      <p>Main Content</p>
      <div className="main-content">
        <MapLeaflet />
        <MapOpenLayers />
      </div>
    </div>
  );
}
