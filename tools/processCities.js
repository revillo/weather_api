const fs = require('fs')
const readline = require('readline');
const path = require('path')

//Read file line by line: https://stackoverflow.com/q/6156501


//Convert US Cities CSV to a compact JSON file
function convertCSVToJSON() {

    var data = {
        cities: []
    };

    var lineReader = readline.createInterface({
        input: fs.createReadStream(path.resolve(__dirname,'../datasets/uscities.csv'))
    });
    
    var first = true;

    lineReader.on('line', (line) => {
        
        //Skip first line
        if (first)
        {
            first = false;
            return;
        }

        var row = line.replace(/"/g, "").split(",");
        data.cities.push({
            cty: row[0],
            sid: row[2],
            pop: parseInt(row[10]),
            lat: parseFloat(row[8]),
            lon: parseFloat(row[9])
            //[row[0], row[2]]
        });
    });

    lineReader.on('close', () => {
        fs.writeFileSync(path.resolve(__dirname,'../datasets/uscities.json'), JSON.stringify(data));
    });

  }

  convertCSVToJSON();