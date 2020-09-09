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
function suggestMatchingCities(input, pageStart, pageCount)
{
    if (!citiesLoaded)
    {
        loadData();
    }

    if (!input || input == "")
    {
        return [];
    }

    var inputArray = input.split(",");
    var inputCity = inputArray[0];

    pageStart = pageStart || 0;
    pageCount = pageCount || 16;

    const letter = inputCity[0].toLowerCase();

    var results = cityData.byFirstLetter[letter].filter(city => {
        const cityMatch = city.cty.toLowerCase().startsWith(inputCity.toLowerCase());
        
        //If State was provided by input, match by state id as well 
        if (cityMatch && inputArray.length > 1)
        {
            var inputState = inputArray[1].replace(/\s+/g, '').toLowerCase();
            return city.sid.toLowerCase().startsWith(inputState);
        } else
        {
            return cityMatch;
        }
    });

    return results.slice(pageStart, pageStart + pageCount);
}

module.exports = {
    suggestMatchingCities : suggestMatchingCities,
    preloadDataset : loadData
}