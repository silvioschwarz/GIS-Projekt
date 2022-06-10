import React from "react";

export default function Statistics(props) {

  console.log(props.data.features)

  const features = props.data.features;
  let distance = 0;
  let duration = 0;

  const featuresElements = features.map((feature) =>{

    let timespan = feature.properties.timespan;
    let parsed = timespan.toString().split(",");
    const [begin, end] = parsed.map((item) => {
      return new Date(item.split('"')[3])
    })
    // let begin = parsed[2];
    //  let end = parsed[4];
    let durationFeature = end - begin;
    // console.log([end])
  

    distance += parseFloat(feature.properties.distance);
    duration += parseFloat(durationFeature);
    return(
      <ul>
        <li>
          Name: {feature.properties.name},Duration: 
          {(durationFeature/1000/3600).toFixed(2)} h
          {(durationFeature/1000/60).toFixed(2)} Min
        </li>
      </ul>
    )
    
  })

  return (
    <div className="statistics-container">
        <h1>Statistics</h1>
        <h3>Distance: {(distance/1000).toFixed(3)} km</h3>
        <h3>Duration: {(duration/1000/3600).toFixed(2)} h</h3>
        {featuresElements}
    </div>
  );
}
