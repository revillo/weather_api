const httpRequest = require('./httpRequest')

//Function to request weather data from location string
//Returns JSON data promise
async function current(location, apiKey)
{
    const urlPath = `/data/2.5/weather?q=${location}&APPID=${apiKey}`;

    var params = {
        host: 'api.openweathermap.org',
        //port: 80,
        //method: 'GET',
        path: encodeURI(urlPath)
    };
    
    return httpRequest(params);    
}

async function oneCall(lat, lon, apiKey)
{
    const urlPath = `/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&APPID=${apiKey}`;

    var params = {
        host: 'api.openweathermap.org',
        //port: 80,
        //method: 'GET',
        path: encodeURI(urlPath)
    };
    
    return httpRequest(params);    
}

module.exports = {
    current : current,
    oneCall : oneCall
}
