const express = require("express");
const app = express();
const cors = require("cors");
// const pool = require("./db");
pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

var port = 4000;
//ROUTES//

//create a todo

// app.post("/todos", async (req, res) => {
//   try {
//     const { description } = req.body;
//     const newTodo = await pool.query(
//       "INSERT INTO todo (description) VALUES($1) RETURNING *",
//       [description]
//     );

//     res.json(newTodo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//get all todos

var psqlQuery ='';
psqlQuery  +=  "SELECT row_to_json(fc) as geojson ";
psqlQuery  += "FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features "; 
psqlQuery  += "FROM (SELECT 'Feature' As type, "; 
psqlQuery  += "ST_AsGeoJSON(CAST (lg.wkb_geometry AS geometry))::json As geometry, ";
psqlQuery  += "row_to_json((SELECT l FROM ";
psqlQuery  += "(SELECT name, address, description, timespan, category, distance) As l)) As properties ";
psqlQuery  += "FROM public.history_2022_05_01 As lg) As f )  As fc;"



var psqlQuery2= 'SELECT *'
psqlQuery2 += ' FROM public.history_2022_05_01;'


var psqlQuery3 ='';
psqlQuery3  +=  "SELECT row_to_json(fc) as geojson ";
psqlQuery3  += "FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features "; 
psqlQuery3  += "FROM (SELECT 'Feature' As type, "; 
psqlQuery3  += "ST_AsGeoJSON(CAST (lg.wkb_geometry AS geometry))::json As geometry, ";
psqlQuery3  += "row_to_json((SELECT l FROM ";
psqlQuery3  += "(SELECT name, address, description, timespan, category, distance) As l)) As properties ";
psqlQuery3  += "FROM public.history_%I"
psqlQuery3  += " As lg) As f )  As fc;"




app.get("/getGeoJSON", async (req, res) => {
  try {
    const geoJSONData = await pool.query(psqlQuery);
    res.json(geoJSONData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/getGeoJSON/:date", async (req, res) => {
  try {
    console.log(req.params)
    const { date } = req.params;
    // let tableName = "public.history_2022_05_20"

    var psqlQuery3 =``;
    psqlQuery3  +=  "SELECT row_to_json(fc) as geojson ";
    psqlQuery3  += "FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features "; 
    psqlQuery3  += "FROM (SELECT 'Feature' As type, "; 
    psqlQuery3  += "ST_AsGeoJSON(CAST (lg.wkb_geometry AS geometry))::json As geometry, ";
    psqlQuery3  += "row_to_json((SELECT l FROM ";
    psqlQuery3  += "(SELECT name, address, description, timespan, category, distance) As l)) As properties ";
    psqlQuery3  += "FROM public.history_"
    // psqlQuery3  += date.replace(/-/g, '_')
    psqlQuery3  += `${date.replace(/-/g, '_')}`
    psqlQuery3  += " As lg) As f )  As fc;"
    // console.log(psqlQuery3)

    const geoJSONData = await pool.query(psqlQuery3);
    // console.log(geoJSONData)
    res.json(geoJSONData.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

// app.get("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
//       id
//     ]);

//     res.json(todo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //update a todo

// app.put("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;
//     const updateTodo = await pool.query(
//       "UPDATE todo SET description = $1 WHERE todo_id = $2",
//       [description, id]
//     );

//     res.json("Todo was updated!");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //delete a todo

// app.delete("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
//       id
//     ]);
//     res.json("Todo was deleted!");
//   } catch (err) {
//     console.log(err.message);
//   }
// });

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});