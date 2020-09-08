const httpRequest = require('./httpRequest')

//Function to request weather data from location string
//Returns JSON data promise
async function weatherRequest(location)
{
    //const urlPath = ['/data/2.5/weather?q=', location, '&APPID=8e9a932437825059609a14accc6f1489'].join('');
    const urlPath = `/data/2.5/weather?q=${location}&APPID=8e9a932437825059609a14accc6f1489`

    var params = {
        host: 'api.openweathermap.org',
        //port: 80,
        //method: 'GET',
        path: encodeURI(urlPath)
    };
    
    return httpRequest(params);    
}

async function oneCallRequest(lat, lon)
{
    const urlPath = `/onecall?lat=${lat}&lon=${lon}&exclude=minutely&APPID=8e9a932437825059609a14accc6f1489`

    var params = {
        host: 'api.openweathermap.org',
        //port: 80,
        //method: 'GET',
        path: encodeURI(urlPath)
    };
    
    return httpRequest(params);    
}

module.exports = weatherRequest;
