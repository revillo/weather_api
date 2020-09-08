
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert")

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

    get users()
    {
        return this.db.collection('users')
    }

    async getAllUsers()
    {
        var db = this;
        return new Promise((resolve, reject) =>
        {
            db.users.find({}).toArray((err, docs) => {
                if(err) {
                    db.logError(err);
                    return reject (err);
                }

                resolve(docs);
            });
        });
    }

    async populateUsers()
    {
        const db = this;

        return new Promise((resolve, reject) => {

            db.users.drop((err, res) => {
                
                db.users.insertMany([{name:"Oliver", age:29}, {name:"Jodie", age:34}], (err, res) => {
                    if (err) {
                        db.logError(err);
                        return reject(err);
                    }

                    resolve(res);
                })

            });
        });
    }

    logError(err)
    {
        console.log("\nERROR\n");
        console.log(this.url, this.name);
        console.error(err);
    }
}

module.exports = Database;