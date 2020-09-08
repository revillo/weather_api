//node modules
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')

//src
//const Database = require('./src/database');
const weatherRequest = require('./src/weatherRequest')
const locationHelper = require('./src/locationHelper')

//Configure express app
var weatherAPI = express();
weatherAPI.use(cors());
weatherAPI.use(bodyParser.urlencoded({ extended: false }));
weatherAPI.use(bodyParser.json());

//Create database connection

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

weatherAPI.get("/get_weather", async (req, res) => {
        
    console.log("Location queried: ", req.query.location);

    weatherRequest(req.query.location)
        .then(body => {
            res.json(body)
        })
        .catch(err => {

            var errJson = {
                error : err
            };
            
            res.json(errJson);
        });
});

weatherAPI.get("/match_location", (req, res) => {
    const cities = locationHelper(req.query.location);
    res.json({cities:cities});
});

weatherAPI.get("/", (req, res) => {
    res.send("Hello World");
});

weatherAPI.get("/sample_result", (req, res) => {
    var j = JSON.parse('{"coord":{"lon":-80.19,"lat":25.77},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"base":"stations","main":{"temp":304.48,"feels_like":306.24,"temp_min":303.71,"temp_max":305.37,"pressure":1015,"humidity":62},"visibility":10000,"wind":{"speed":5.1,"deg":100},"clouds":{"all":40},"dt":1599172802,"sys":{"type":1,"id":4896,"country":"US","sunrise":1599130935,"sunset":1599176284},"timezone":-14400,"id":4164138,"name":"Miami","cod":200}');
    res.json(j);
});


//Start API
weatherAPI.listen(4000, () => {
    console.log("API available: http://localhost:4000");
});