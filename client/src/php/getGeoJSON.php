<?php
// Verbindungsaufbau und Auswahl der Datenbank
$dbconn = pg_connect("host=localhost port=5432 dbname=testdb user=postgres password=postgres")
    or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

// Eine SQL-Abfrge ausführen
$query = "SELECT row_to_json(fc)
 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
 FROM (SELECT 'Feature' As type
    , ST_AsGeoJSON(lg.wkb_gegometry)::json As geometry
    , row_to_json((SELECT l FROM (SELECT name, address, description, timespan, category, distance) As l
      )) As properties
   FROM history_2022_05_22 As lg   ) As f )  As fc;";
$result = pg_query($query) or die('Abfrage fehlgeschlagen: ' . pg_last_error());

// Ergebnisse als GEOJSON ausgeben
while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
	 foreach ($line as $col_value) {
        echo json_encode($col_value, JSON_NUMERIC_CHECK);
    }
}

// Speicher freigeben
pg_free_result($result);

// Verbindung schließen
pg_close($dbconn);
?>
