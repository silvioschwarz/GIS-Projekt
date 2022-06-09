import React from "react";

export default function Statistics(props) {

  console.log(props.data.features)

  const features = props.data.features;
  let distance = 0;
  let duration = 0;

  const featuresElements = features.map((feature) =>{

    let timespan = feature.properties.timespan;
    // let parsed = JSON.parse(timespan)
    // let durationFeature = timespan.end  -timespan.begin;
    console.log(timespan)
    // console.log(parsed)

    distance += parseFloat(feature.properties.distance);
    return(
      <ul>
        <li>
          {feature.properties.name}
        </li>
      </ul>
    )
    
  })

  return (
    <div className="testdiv">
        <h1>Statistics</h1>
        <h3>Distance: {distance} m</h3>
        {featuresElements}
    </div>
  );
}
