const weatherRequest = require('../src/weatherRequest')

var apiKey = "8e9a932437825059609a14accc6f1489";

test('OpenWeatherMap API current returns data', done => {
    
    weatherRequest.current("Miami", apiKey)
        .then(data => {
            expect(data.name).toBe('Miami');
            done();
        })
        .catch(err => {
            done(err)
        });

});

test('OpenWeatherMap API one call returns data', done => {
    
    weatherRequest.oneCall(33.44, -94.04, apiKey)
        .then(data => {
            expect(data.hourly).toBeDefined();
            done();
        })
        .catch(err => {
            done(err)
        });

});