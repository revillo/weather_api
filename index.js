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

weatherAPI.get("/current_weather", async (req, res) => {
        
    console.log("Location queried: ", req.query.location);

    weatherRequest.current(req.query.location)
        .then(body => {
            res.json(body)
        })
        .catch(err => {
            res.json({
                error: err
            });
        });
});

weatherAPI.get("/one_call", async (req, res) => {
    
    const query = req.query;

    weatherRequest.oneCall(query.lat, query.lon)
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

weatherAPI.get("/sample_one_call", (req, res) => {
    var j = JSON.parse(`{
        "lat": 33.44,
        "lon": -94.04,
        "timezone": "America/Chicago",
        "timezone_offset": -18000,
        "current": {
        "dt": 1599581330,
        "sunrise": 1599566126,
        "sunset": 1599611532,
        "temp": 300.85,
        "feels_like": 303.72,
        "pressure": 1014,
        "humidity": 74,
        "dew_point": 295.79,
        "uvi": 9.56,
        "clouds": 1,
        "visibility": 10000,
        "wind_speed": 3.1,
        "wind_deg": 180,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ]
        },
        "minutely": [],
        "hourly": [
        {
        "dt": 1599580800,
        "temp": 300.85,
        "feels_like": 303.86,
        "pressure": 1014,
        "humidity": 74,
        "dew_point": 295.79,
        "clouds": 1,
        "visibility": 10000,
        "wind_speed": 2.9,
        "wind_deg": 143,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ],
        "pop": 0.22
        },
        {
        "dt": 1599584400,
        "temp": 301.75,
        "feels_like": 303.85,
        "pressure": 1014,
        "humidity": 66,
        "dew_point": 294.77,
        "clouds": 8,
        "visibility": 10000,
        "wind_speed": 3.42,
        "wind_deg": 148,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ],
        "pop": 0.11
        },
        {
        "dt": 1599588000,
        "temp": 303.28,
        "feels_like": 305.01,
        "pressure": 1013,
        "humidity": 59,
        "dew_point": 294.39,
        "clouds": 10,
        "visibility": 10000,
        "wind_speed": 3.66,
        "wind_deg": 149,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ],
        "pop": 0.11
        },
        {
        "dt": 1599591600,
        "temp": 304.46,
        "feels_like": 305.82,
        "pressure": 1012,
        "humidity": 52,
        "dew_point": 293.43,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 3.52,
        "wind_deg": 149,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599595200,
        "temp": 305.18,
        "feels_like": 306.51,
        "pressure": 1012,
        "humidity": 48,
        "dew_point": 292.8,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 3.13,
        "wind_deg": 151,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599598800,
        "temp": 305.34,
        "feels_like": 306.93,
        "pressure": 1011,
        "humidity": 47,
        "dew_point": 292.72,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 2.63,
        "wind_deg": 145,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599602400,
        "temp": 305.27,
        "feels_like": 307.25,
        "pressure": 1010,
        "humidity": 47,
        "dew_point": 292.74,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 2.03,
        "wind_deg": 130,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599606000,
        "temp": 304.65,
        "feels_like": 307.61,
        "pressure": 1010,
        "humidity": 54,
        "dew_point": 294.39,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 1.78,
        "wind_deg": 97,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599609600,
        "temp": 301.43,
        "feels_like": 303.79,
        "pressure": 1011,
        "humidity": 63,
        "dew_point": 293.79,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 2.29,
        "wind_deg": 83,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599613200,
        "temp": 299.55,
        "feels_like": 300.56,
        "pressure": 1011,
        "humidity": 64,
        "dew_point": 292.23,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 3.2,
        "wind_deg": 86,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599616800,
        "temp": 298.69,
        "feels_like": 298.71,
        "pressure": 1012,
        "humidity": 63,
        "dew_point": 291.36,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 3.94,
        "wind_deg": 98,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599620400,
        "temp": 297.87,
        "feels_like": 297.65,
        "pressure": 1013,
        "humidity": 64,
        "dew_point": 290.62,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 3.97,
        "wind_deg": 110,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599624000,
        "temp": 296.82,
        "feels_like": 296.95,
        "pressure": 1013,
        "humidity": 66,
        "dew_point": 290.27,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 3.17,
        "wind_deg": 114,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599627600,
        "temp": 296.02,
        "feels_like": 296.28,
        "pressure": 1013,
        "humidity": 70,
        "dew_point": 290.27,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 3.09,
        "wind_deg": 102,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599631200,
        "temp": 295.6,
        "feels_like": 296.13,
        "pressure": 1014,
        "humidity": 72,
        "dew_point": 290.51,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 2.72,
        "wind_deg": 93,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599634800,
        "temp": 295.36,
        "feels_like": 296.44,
        "pressure": 1014,
        "humidity": 76,
        "dew_point": 291.03,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 2.31,
        "wind_deg": 99,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599638400,
        "temp": 295.14,
        "feels_like": 296.18,
        "pressure": 1014,
        "humidity": 79,
        "dew_point": 291.49,
        "clouds": 1,
        "visibility": 10000,
        "wind_speed": 2.61,
        "wind_deg": 100,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599642000,
        "temp": 295.09,
        "feels_like": 296.23,
        "pressure": 1014,
        "humidity": 82,
        "dew_point": 292.02,
        "clouds": 31,
        "visibility": 10000,
        "wind_speed": 2.81,
        "wind_deg": 100,
        "weather": [
        {
        "id": 802,
        "main": "Clouds",
        "description": "scattered clouds",
        "icon": "03n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599645600,
        "temp": 294.81,
        "feels_like": 296.3,
        "pressure": 1014,
        "humidity": 85,
        "dew_point": 292.35,
        "clouds": 40,
        "visibility": 10000,
        "wind_speed": 2.51,
        "wind_deg": 110,
        "weather": [
        {
        "id": 802,
        "main": "Clouds",
        "description": "scattered clouds",
        "icon": "03n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599649200,
        "temp": 294.57,
        "feels_like": 296.48,
        "pressure": 1015,
        "humidity": 87,
        "dew_point": 292.37,
        "clouds": 32,
        "visibility": 10000,
        "wind_speed": 1.99,
        "wind_deg": 114,
        "weather": [
        {
        "id": 802,
        "main": "Clouds",
        "description": "scattered clouds",
        "icon": "03n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599652800,
        "temp": 294.42,
        "feels_like": 296.5,
        "pressure": 1016,
        "humidity": 88,
        "dew_point": 292.47,
        "clouds": 27,
        "visibility": 10000,
        "wind_speed": 1.77,
        "wind_deg": 93,
        "weather": [
        {
        "id": 802,
        "main": "Clouds",
        "description": "scattered clouds",
        "icon": "03d"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599656400,
        "temp": 295.65,
        "feels_like": 297.58,
        "pressure": 1016,
        "humidity": 86,
        "dew_point": 293.33,
        "clouds": 9,
        "visibility": 10000,
        "wind_speed": 2.55,
        "wind_deg": 82,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599660000,
        "temp": 297.71,
        "feels_like": 300.01,
        "pressure": 1016,
        "humidity": 81,
        "dew_point": 294.28,
        "clouds": 4,
        "visibility": 10000,
        "wind_speed": 2.75,
        "wind_deg": 86,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599663600,
        "temp": 299.61,
        "feels_like": 301.67,
        "pressure": 1017,
        "humidity": 76,
        "dew_point": 295.05,
        "clouds": 3,
        "visibility": 10000,
        "wind_speed": 3.68,
        "wind_deg": 92,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599667200,
        "temp": 301.52,
        "feels_like": 304.02,
        "pressure": 1017,
        "humidity": 70,
        "dew_point": 295.61,
        "clouds": 2,
        "visibility": 10000,
        "wind_speed": 3.42,
        "wind_deg": 103,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599670800,
        "temp": 302.54,
        "feels_like": 305.16,
        "pressure": 1018,
        "humidity": 67,
        "dew_point": 295.89,
        "clouds": 2,
        "visibility": 10000,
        "wind_speed": 3.44,
        "wind_deg": 108,
        "weather": [
        {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
        }
        ],
        "pop": 0.27,
        "rain": {
        "1h": 0.82
        }
        },
        {
        "dt": 1599674400,
        "temp": 303.1,
        "feels_like": 305.83,
        "pressure": 1017,
        "humidity": 65,
        "dew_point": 295.93,
        "clouds": 3,
        "visibility": 9283,
        "wind_speed": 3.3,
        "wind_deg": 117,
        "weather": [
        {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
        }
        ],
        "pop": 0.53,
        "rain": {
        "1h": 0.74
        }
        },
        {
        "dt": 1599678000,
        "temp": 303.12,
        "feels_like": 306.05,
        "pressure": 1017,
        "humidity": 65,
        "dew_point": 296.01,
        "clouds": 7,
        "visibility": 10000,
        "wind_speed": 3.04,
        "wind_deg": 125,
        "weather": [
        {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
        }
        ],
        "pop": 0.87,
        "rain": {
        "1h": 0.96
        }
        },
        {
        "dt": 1599681600,
        "temp": 303.57,
        "feels_like": 306.35,
        "pressure": 1016,
        "humidity": 62,
        "dew_point": 295.67,
        "clouds": 29,
        "visibility": 10000,
        "wind_speed": 2.97,
        "wind_deg": 118,
        "weather": [
        {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
        }
        ],
        "pop": 0.96,
        "rain": {
        "1h": 0.34
        }
        },
        {
        "dt": 1599685200,
        "temp": 303.51,
        "feels_like": 306.04,
        "pressure": 1016,
        "humidity": 61,
        "dew_point": 295.33,
        "clouds": 21,
        "visibility": 10000,
        "wind_speed": 3.09,
        "wind_deg": 101,
        "weather": [
        {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
        }
        ],
        "pop": 0.96,
        "rain": {
        "1h": 0.62
        }
        },
        {
        "dt": 1599688800,
        "temp": 302.07,
        "feels_like": 304.29,
        "pressure": 1016,
        "humidity": 69,
        "dew_point": 295.97,
        "clouds": 40,
        "visibility": 10000,
        "wind_speed": 4.04,
        "wind_deg": 82,
        "weather": [
        {
        "id": 501,
        "main": "Rain",
        "description": "moderate rain",
        "icon": "10d"
        }
        ],
        "pop": 0.97,
        "rain": {
        "1h": 1.04
        }
        },
        {
        "dt": 1599692400,
        "temp": 301.32,
        "feels_like": 304.45,
        "pressure": 1017,
        "humidity": 74,
        "dew_point": 296.37,
        "clouds": 51,
        "visibility": 10000,
        "wind_speed": 3.09,
        "wind_deg": 75,
        "weather": [
        {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
        }
        ],
        "pop": 0.97,
        "rain": {
        "1h": 0.16
        }
        },
        {
        "dt": 1599696000,
        "temp": 299.72,
        "feels_like": 303.07,
        "pressure": 1017,
        "humidity": 78,
        "dew_point": 295.75,
        "clouds": 42,
        "visibility": 10000,
        "wind_speed": 2.25,
        "wind_deg": 65,
        "weather": [
        {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
        }
        ],
        "pop": 0.98,
        "rain": {
        "1h": 0.13
        }
        },
        {
        "dt": 1599699600,
        "temp": 298.08,
        "feels_like": 301,
        "pressure": 1018,
        "humidity": 81,
        "dew_point": 294.68,
        "clouds": 16,
        "visibility": 10000,
        "wind_speed": 2.12,
        "wind_deg": 55,
        "weather": [
        {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10n"
        }
        ],
        "pop": 0.71,
        "rain": {
        "1h": 0.1
        }
        },
        {
        "dt": 1599703200,
        "temp": 297.13,
        "feels_like": 299.47,
        "pressure": 1019,
        "humidity": 86,
        "dew_point": 294.69,
        "clouds": 51,
        "visibility": 10000,
        "wind_speed": 2.99,
        "wind_deg": 47,
        "weather": [
        {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10n"
        }
        ],
        "pop": 0.6,
        "rain": {
        "1h": 0.24
        }
        },
        {
        "dt": 1599706800,
        "temp": 296.64,
        "feels_like": 298.69,
        "pressure": 1019,
        "humidity": 88,
        "dew_point": 294.59,
        "clouds": 68,
        "visibility": 10000,
        "wind_speed": 3.33,
        "wind_deg": 58,
        "weather": [
        {
        "id": 803,
        "main": "Clouds",
        "description": "broken clouds",
        "icon": "04n"
        }
        ],
        "pop": 0.56
        },
        {
        "dt": 1599710400,
        "temp": 296.22,
        "feels_like": 297.61,
        "pressure": 1019,
        "humidity": 85,
        "dew_point": 293.73,
        "clouds": 64,
        "visibility": 10000,
        "wind_speed": 3.57,
        "wind_deg": 73,
        "weather": [
        {
        "id": 803,
        "main": "Clouds",
        "description": "broken clouds",
        "icon": "04n"
        }
        ],
        "pop": 0.48
        },
        {
        "dt": 1599714000,
        "temp": 295.34,
        "feels_like": 296.54,
        "pressure": 1019,
        "humidity": 84,
        "dew_point": 292.58,
        "clouds": 70,
        "visibility": 10000,
        "wind_speed": 3.14,
        "wind_deg": 70,
        "weather": [
        {
        "id": 803,
        "main": "Clouds",
        "description": "broken clouds",
        "icon": "04n"
        }
        ],
        "pop": 0.33
        },
        {
        "dt": 1599717600,
        "temp": 294.51,
        "feels_like": 295.42,
        "pressure": 1019,
        "humidity": 84,
        "dew_point": 291.88,
        "clouds": 69,
        "visibility": 10000,
        "wind_speed": 3.02,
        "wind_deg": 69,
        "weather": [
        {
        "id": 803,
        "main": "Clouds",
        "description": "broken clouds",
        "icon": "04n"
        }
        ],
        "pop": 0.3
        },
        {
        "dt": 1599721200,
        "temp": 293.98,
        "feels_like": 294.78,
        "pressure": 1019,
        "humidity": 86,
        "dew_point": 291.71,
        "clouds": 55,
        "visibility": 10000,
        "wind_speed": 3.09,
        "wind_deg": 64,
        "weather": [
        {
        "id": 803,
        "main": "Clouds",
        "description": "broken clouds",
        "icon": "04n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599724800,
        "temp": 293.78,
        "feels_like": 294.64,
        "pressure": 1019,
        "humidity": 88,
        "dew_point": 291.87,
        "clouds": 46,
        "visibility": 10000,
        "wind_speed": 3.12,
        "wind_deg": 58,
        "weather": [
        {
        "id": 802,
        "main": "Clouds",
        "description": "scattered clouds",
        "icon": "03n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599728400,
        "temp": 293.57,
        "feels_like": 294.42,
        "pressure": 1019,
        "humidity": 91,
        "dew_point": 292.12,
        "clouds": 43,
        "visibility": 10000,
        "wind_speed": 3.34,
        "wind_deg": 56,
        "weather": [
        {
        "id": 802,
        "main": "Clouds",
        "description": "scattered clouds",
        "icon": "03n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599732000,
        "temp": 293.55,
        "feels_like": 294.68,
        "pressure": 1020,
        "humidity": 93,
        "dew_point": 292.44,
        "clouds": 39,
        "visibility": 10000,
        "wind_speed": 3.15,
        "wind_deg": 57,
        "weather": [
        {
        "id": 802,
        "main": "Clouds",
        "description": "scattered clouds",
        "icon": "03n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599735600,
        "temp": 293.49,
        "feels_like": 294.86,
        "pressure": 1020,
        "humidity": 95,
        "dew_point": 292.71,
        "clouds": 32,
        "visibility": 10000,
        "wind_speed": 3,
        "wind_deg": 58,
        "weather": [
        {
        "id": 802,
        "main": "Clouds",
        "description": "scattered clouds",
        "icon": "03n"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599739200,
        "temp": 293.45,
        "feels_like": 295.09,
        "pressure": 1021,
        "humidity": 96,
        "dew_point": 292.91,
        "clouds": 31,
        "visibility": 10000,
        "wind_speed": 2.7,
        "wind_deg": 54,
        "weather": [
        {
        "id": 802,
        "main": "Clouds",
        "description": "scattered clouds",
        "icon": "03d"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599742800,
        "temp": 294.67,
        "feels_like": 296.1,
        "pressure": 1021,
        "humidity": 94,
        "dew_point": 293.72,
        "clouds": 4,
        "visibility": 10000,
        "wind_speed": 3.59,
        "wind_deg": 57,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599746400,
        "temp": 296.38,
        "feels_like": 297.69,
        "pressure": 1022,
        "humidity": 89,
        "dew_point": 294.51,
        "clouds": 13,
        "visibility": 10000,
        "wind_speed": 4.33,
        "wind_deg": 63,
        "weather": [
        {
        "id": 801,
        "main": "Clouds",
        "description": "few clouds",
        "icon": "02d"
        }
        ],
        "pop": 0
        },
        {
        "dt": 1599750000,
        "temp": 297.82,
        "feels_like": 299.19,
        "pressure": 1022,
        "humidity": 83,
        "dew_point": 294.9,
        "clouds": 24,
        "visibility": 10000,
        "wind_speed": 4.44,
        "wind_deg": 64,
        "weather": [
        {
        "id": 801,
        "main": "Clouds",
        "description": "few clouds",
        "icon": "02d"
        }
        ],
        "pop": 0
        }
        ],
        "daily": [
        {
        "dt": 1599588000,
        "sunrise": 1599566126,
        "sunset": 1599611532,
        "temp": {
        "day": 302.36,
        "min": 295.6,
        "max": 304.37,
        "night": 295.6,
        "eve": 301.39,
        "morn": 300.85
        },
        "feels_like": {
        "day": 304.33,
        "night": 296.13,
        "eve": 303.73,
        "morn": 304.11
        },
        "pressure": 1014,
        "humidity": 64,
        "dew_point": 294.85,
        "wind_speed": 3.66,
        "wind_deg": 149,
        "weather": [
        {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
        }
        ],
        "clouds": 6,
        "pop": 0.22,
        "uvi": 9.56
        },
        {
        "dt": 1599674400,
        "sunrise": 1599652566,
        "sunset": 1599697850,
        "temp": {
        "day": 303.1,
        "min": 294.42,
        "max": 303.51,
        "night": 294.51,
        "eve": 299.72,
        "morn": 294.42
        },
        "feels_like": {
        "day": 305.83,
        "night": 295.42,
        "eve": 303.07,
        "morn": 296.5
        },
        "pressure": 1017,
        "humidity": 65,
        "dew_point": 295.93,
        "wind_speed": 3.3,
        "wind_deg": 117,
        "weather": [
        {
        "id": 501,
        "main": "Rain",
        "description": "moderate rain",
        "icon": "10d"
        }
        ],
        "clouds": 3,
        "pop": 0.98,
        "rain": 5.38,
        "uvi": 9.06
        },
        {
        "dt": 1599760800,
        "sunrise": 1599739005,
        "sunset": 1599784168,
        "temp": {
        "day": 302,
        "min": 293.19,
        "max": 303.22,
        "night": 293.19,
        "eve": 298.87,
        "morn": 293.45
        },
        "feels_like": {
        "day": 303.5,
        "night": 294.52,
        "eve": 300.67,
        "morn": 295.09
        },
        "pressure": 1021,
        "humidity": 65,
        "dew_point": 294.86,
        "wind_speed": 4.27,
        "wind_deg": 55,
        "weather": [
        {
        "id": 801,
        "main": "Clouds",
        "description": "few clouds",
        "icon": "02d"
        }
        ],
        "clouds": 19,
        "pop": 0,
        "uvi": 9.03
        },
        {
        "dt": 1599847200,
        "sunrise": 1599825444,
        "sunset": 1599870485,
        "temp": {
        "day": 298.71,
        "min": 293.74,
        "max": 300.87,
        "night": 293.74,
        "eve": 298.67,
        "morn": 293.95
        },
        "feels_like": {
        "day": 301.37,
        "night": 295.88,
        "eve": 301.58,
        "morn": 295.25
        },
        "pressure": 1019,
        "humidity": 78,
        "dew_point": 294.75,
        "wind_speed": 2.49,
        "wind_deg": 55,
        "weather": [
        {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04d"
        }
        ],
        "clouds": 100,
        "pop": 0.03,
        "uvi": 8.63
        },
        {
        "dt": 1599933600,
        "sunrise": 1599911883,
        "sunset": 1599956802,
        "temp": {
        "day": 302.86,
        "min": 292.39,
        "max": 303.67,
        "night": 296.21,
        "eve": 299.87,
        "morn": 292.39
        },
        "feels_like": {
        "day": 306.07,
        "night": 299.14,
        "eve": 303.09,
        "morn": 294.59
        },
        "pressure": 1014,
        "humidity": 59,
        "dew_point": 294,
        "wind_speed": 1.27,
        "wind_deg": 358,
        "weather": [
        {
        "id": 803,
        "main": "Clouds",
        "description": "broken clouds",
        "icon": "04d"
        }
        ],
        "clouds": 56,
        "pop": 0,
        "uvi": 8.36
        },
        {
        "dt": 1600020000,
        "sunrise": 1599998323,
        "sunset": 1600043119,
        "temp": {
        "day": 304.75,
        "min": 295.62,
        "max": 304.75,
        "night": 296.53,
        "eve": 300.08,
        "morn": 295.62
        },
        "feels_like": {
        "day": 308.04,
        "night": 299.36,
        "eve": 303.47,
        "morn": 298.28
        },
        "pressure": 1015,
        "humidity": 54,
        "dew_point": 294.44,
        "wind_speed": 1.38,
        "wind_deg": 23,
        "weather": [
        {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
        }
        ],
        "clouds": 86,
        "pop": 0.72,
        "rain": 1.61,
        "uvi": 8.56
        },
        {
        "dt": 1600106400,
        "sunrise": 1600084762,
        "sunset": 1600129436,
        "temp": {
        "day": 300.46,
        "min": 293.74,
        "max": 302.34,
        "night": 294.59,
        "eve": 299.16,
        "morn": 293.74
        },
        "feels_like": {
        "day": 301.99,
        "night": 294.66,
        "eve": 300.79,
        "morn": 294.09
        },
        "pressure": 1018,
        "humidity": 67,
        "dew_point": 293.88,
        "wind_speed": 3.53,
        "wind_deg": 55,
        "weather": [
        {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04d"
        }
        ],
        "clouds": 95,
        "pop": 0.68,
        "uvi": 8.19
        },
        {
        "dt": 1600192800,
        "sunrise": 1600171201,
        "sunset": 1600215752,
        "temp": {
        "day": 299.16,
        "min": 291.99,
        "max": 300.5,
        "night": 291.99,
        "eve": 296.61,
        "morn": 293.18
        },
        "feels_like": {
        "day": 300.65,
        "night": 293.63,
        "eve": 298.36,
        "morn": 293.68
        },
        "pressure": 1017,
        "humidity": 68,
        "dew_point": 292.94,
        "wind_speed": 2.91,
        "wind_deg": 81,
        "weather": [
        {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04d"
        }
        ],
        "clouds": 89,
        "pop": 0.01,
        "uvi": 8.5
        }
        ]
        }`);
    res.json({
        query : {
            cty : "Texarkana",
            sid: "TX"
        },
        results: j
    });
});


//Start API
weatherAPI.listen(4000, () => {
    console.log("API available: http://localhost:4000");
});