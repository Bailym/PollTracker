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

        // Use the collection "people"
        return (db.collection("polls"));

    } catch (err) {
        console.log(err.stack);
    }
}


module.exports = {
    async AddPoll(req, res) {

        const collection = await Connect(); //connect to the database

        try {
            //construct a document with poll details
            let pollDocument = {
                "Source": req.body.source,
                "DatePublished": new Date(req.body.datePublished),
                "SurveyDate": { "StartDate": new Date(req.body.startDate), "EndDate": new Date(req.body.endDate) },
                "ChangesWith": new Date(req.body.changesWith),
                "Data": req.body.parties
            }

            // Insert a single document, wait for promise so we can read it back
            await collection.insertOne(pollDocument);
        } catch (err) {
            console.log(err.stack);
        }
        finally {
            await client.close();
        }
    },

    async GetPoll(req, res) {
        const collection = await Connect(); //connect to the database
        try{

            // Find the poll with the id from the GET request 
            const myDoc = await collection.findOne({"_id": ObjectId(req.params.id)});

            //send it back to the client
            res.send(myDoc);
        }
        catch (err) {
            console.log(err.stack);
        }
        finally {
            await client.close();
        }
    },

    async GetAllPolls(req, res) {
        const collection = await Connect(); //connect to the database
        try{

            // Find all the polls
            const pollDocs = await collection.find({}).toArray();

            //send polls back to the client
            res.send(pollDocs);

        }
        catch (err) {
            console.log(err.stack);
        }
        finally {
            await client.close();
        }
    }

}

