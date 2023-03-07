const moment = require('moment'); //require
const { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

// Replace the following with your Atlas connection string                                                                                                                                        
var url = process.env.MONGO_URL;
const client = new MongoClient(url);


async function Connect() {

    try {
        await client.connect();
        const db = client.db("PollTrackerCluster");
        return (db.collection("sources"));

    } catch (err) {
        console.log(err.stack);
    }
}

module.exports = {

    async AddSource(req, res) {

        const collection = await Connect(); //connect to the database

        try {
            let sourceDocument = {
                "Name": req.params.name,
            }

            // Insert the document
            await collection.insertOne(sourceDocument);

        }
        catch (err) {
            console.log(err.stack);
            res.sendStatus(500);
        }

    },

    async GetAllSources(request, response) {
        const collection = await Connect();
        try {
            const allFoundSources = await collection.find({}).toArray();
            response.send(allFoundSources);
        }
        catch (err) {
            console.log(err.stack);
            response.sendStatus(500);
        }
    }
}