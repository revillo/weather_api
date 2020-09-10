//node modules
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path');

//src
//const Database = require('./src/database');
const weatherRequest = require('./src/weatherRequest')
const locationHelper = require('./src/locationHelper')

//Configure express app
var weatherAPI = express();
weatherAPI.use(cors());
weatherAPI.use(bodyParser.urlencoded({ extended: false }));
weatherAPI.use(bodyParser.json());

//Load Config file 
const AppData = JSON.parse(
    fs.readFileSync(
        path.resolve(__dirname, 'default_config.json')
    )
);

//Just keeping this for reference. 
//Could use MongoDB to cache weather results to throttle calls to weather api
/* 
var db = new Database('mongodb://localhost:27017', 'weather_db');

//First establish connection, then launch API
db.connect()
    .then(async (db) => {

    })
    //Database error
    .catch(err => {
        console.log("Mongo Error:", err);
    })
*/

locationHelper.preloadDataset();

//deprecated
weatherAPI.get("/current_weather", async (req, res) => {
        
    console.log("Location queried: ", req.query.location);

    weatherRequest.current(req.query.location, AppData.OPEN_WEATHER_API_KEY)
        .then(body => {
            res.json(body)
        })
        .catch(err => {
            res.json({
                error: err
            });
        });
});

//input {lat: float, lon: float}
//output (proxies call to api.openweathermap.org/data/2.5/onecall)
//see https://openweathermap.org/api/one-call-api
weatherAPI.get("/one_call", async (req, res) => {
    
    const query = req.query;

    weatherRequest.oneCall(query.lat, query.lon, AppData.OPEN_WEATHER_API_KEY)
        .then(body => {
            res.json({
                query: query,
                results: body
            })
        })
        .catch(err => {            
            res.json({
                error: err
            });
        });
});

//input {location:string}
//output {cities : [{cty: string, sid: string, lat: float, lon: float, pop: int}, ...]}
weatherAPI.get("/match_location", (req, res) => {
    const cities = locationHelper.suggestMatchingCities(req.query.location);
    res.json({cities:cities});
});

weatherAPI.get("/", (req, res) => {
    res.send("Hello World");
});

//Start API
weatherAPI.listen(process.env.PORT || 4000, () => {
    console.log("API available");
});