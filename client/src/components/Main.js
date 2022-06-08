import React from "react";

import MapOpenLayers from "./openLayers/MapOpenLayers";

export default function Main() {

  return (
    <main>
      <p>Main Content</p>

      {/* <input type="datetime-local" id="starDate"></input>
      -
      <input type="datetime-local" id="endDate"></input>
      <input type="submit"></input> */}
      {/* <form> */}
     
      {/* <input type="submit"></input>
      </form> */}

      <div className="main-content">
        <MapOpenLayers />
      </div>
    </main>
  );
}
