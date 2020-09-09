const locationHelper = require('../src/locationHelper');

test("Location Helper finds matching city", () => {

    var results = locationHelper.suggestMatchingCities("albuq");
    expect(results[0].cty).toBe("Albuquerque");

});

test("Location Helper finds matching city and state", () => {

    var results = locationHelper.suggestMatchingCities("Freeport, F");
    expect(results[0].sid).toBe("FL");

});