
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert")

//This file is a stub and is not currently used
//Leaving it here in case it makes sense to build a mongo db to cache weather results
class Database
{
    constructor(url, name)
    {
        this.url = url;
        this.name = name;
        this.client = new MongoClient(url);
        this.connected = false;
    }

    async connect()
    {
        const thiz = this;
            
        return this.client.connect()
            .then((res) => {
                thiz.db = thiz.client.db(thiz.name);
                thiz.connected = true;
                console.log("Connected to MongoDB");
                return thiz;
            })
            .catch((err) => thiz.logError(err))
    }

    disconnect()
    {
        this.client.close();
    }

    get weather()
    {
        return this.db.collection('weather-cache')
    }

    logError(err)
    {
        console.log("\nERROR\n");
        console.log(this.url, this.name);
        console.error(err);
    }
}

module.exports = Database;