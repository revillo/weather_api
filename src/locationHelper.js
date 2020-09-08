const fs = require('fs')
const path = require("path");
var citiesLoaded = false;
var cityData = {};

function comparePopulation(cityA, cityB) {
    if (cityA.pop > cityB.pop) {
      return -1;
    }
    if (cityA.pop < cityB.pop) {
      return 1;
    }
    return 0;
  }

function loadData()
{
    const text = fs.readFileSync(
        path.resolve(__dirname,'../datasets/uscities.json')
    );

    const jsonData = JSON.parse(text);

    var byFirstLetter = {};

    jsonData.cities.forEach(city => {
        var letter = city.cty[0].toLowerCase();
        byFirstLetter[letter] = byFirstLetter[letter] || [];
        byFirstLetter[letter].push(city);
    })

    for (letter in byFirstLetter)
    {
        byFirstLetter[letter].sort(comparePopulation);
    }

    cityData.byFirstLetter = byFirstLetter;

    citiesLoaded = true;
}

//Returns an array of matching city names that start with input
function findSimilar(input, pageStart, pageCount)
{
    if (!citiesLoaded)
    {
        loadData();
    }

    if (!input || input == "")
    {
        return [];
    }

    pageStart = pageStart || 0;
    pageCount = pageCount || 16;

    const letter = input[0].toLowerCase();

    var results = cityData.byFirstLetter[letter].filter(city => {
        return city.cty.toLowerCase().startsWith(input.toLowerCase());
    });

    return results.slice(pageStart, pageStart + pageCount);
}

module.exports = findSimilar;