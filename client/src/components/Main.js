import React from "react";

import MapOpenLayers from "./openLayers/MapOpenLayers";
import Statistics from "./Statistics";

export default function Main() {
  const port = 4000;

  const [showLayer1, setShowLayer1] = React.useState(true);
  const [showLayer2, setShowLayer2] = React.useState(true);



  const [datum, setDatum] = React.useState("2022-05-01");
  const [geoJSONObject, setGeoJSONObject] = React.useState(
    require("../data/GeoJSON/2022-05-20.json")
  );

  React.useEffect(() => {
    setShowLayer1(prevState => !prevState)
    fetch(`http://localhost:${port}/getGeoJSON/${datum}`)
      .then((res) => {
        console.log("fetched!");
        if (!res.ok) {
          throw new Error("Network response was not OK");
        }
        return res.json();
      })
      .then((data) => {
        setShowLayer1(prevState => !prevState)
        setGeoJSONObject(data[0]["geojson"]);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, [datum]);

  function handleDatum() {
    let newDatum = document.getElementById("test-date2").value;
    setDatum(newDatum);
  }

  return (
    <main>
      <p>Main Content</p>
      <div>
        <label htmlFor="test-date">Tag wählen: </label>
        <input
          type="date"
          name="datum"
          id="test-date2"
          value={datum}
          onChange={handleDatum}
        />
      </div>

      {/* <input type="datetime-local" id="starDate"></input>
      -
      <input type="datetime-local" id="endDate"></input>
      <input type="submit"></input> */}
      {/* <form> */}

      {/* <input type="submit"></input>
      </form> */}

      <div className="main-content">
        <MapOpenLayers showLayer1={showLayer1} showLayer2={showLayer2} data={geoJSONObject}/>
        <Statistics data={geoJSONObject}/>
      </div>
      <div>
        <input
          type="checkbox"
          checked={showLayer1}
          onChange={(event) => setShowLayer1(event.target.checked)}
        />{" "}
        Show Path 1
      </div>
      <div>
        <input
          type="checkbox"
          checked={showLayer2}
          onChange={(event) => setShowLayer2(event.target.checked)}
        />{" "}
        Show Path 2
      </div>
    </main>
  );
}
