const locationHelper = require('../src/locationHelper');

test("Location Helper finds matching city", () => {

    var results = locationHelper("albuq");
    expect(results[0][0]).toBe("Albuquerque");

});