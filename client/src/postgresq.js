const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "testdb"
});

var psqlQuery ='';
psqlQuery  +=  "SELECT row_to_json(fc) as geojson ";
psqlQuery  += "FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features "; 
psqlQuery  += "FROM (SELECT 'Feature' As type, "; 
psqlQuery  += "ST_AsGeoJSON(CAST (lg.wkb_geometry AS geometry))::json As geometry, ";
psqlQuery  += "row_to_json((SELECT l FROM ";
psqlQuery  += "(SELECT name, address, description, timespan, category, distance) As l)) As properties ";
psqlQuery  += "FROM public.history_2022_05_20 As lg) As f )  As fc;"


psqlQuery2= "SELECT name, address, description, timespan, category, distance"
psqlQuery2 += " FROM public.history_2022_05_20;"
// console.log(pqslQuery)

pool.query(psqlQuery2,
    (err,res) =>{

    console.log(res.rows)
})
