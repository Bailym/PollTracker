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
        return (db.collection("polls"));

    } catch (err) {
        console.log(err.stack);
    }
}


module.exports = {
    async AddPoll(req, res) {

        const pollsCollection = await Connect();

        try {

            let partyDetailsZeroPointsRemoved = req.body.partyDetails.filter(party => party.pointsValue !== null);
            let newPollDocumentToAdd = {
                "Source": req.body.sourceValue,
                "DatePublished": new Date(req.body.datePublishedValue),
                "SurveyDate": { "StartDate": new Date(req.body.startDateValue), "EndDate": new Date(req.body.endDate) },
                "ChangesWith": new Date(req.body.changesWithValue),
                "SampleSize": req.body.sampleSizeValue,
                "Data": partyDetailsZeroPointsRemoved
            }

            await pollsCollection.insertOne(newPollDocumentToAdd);
        } catch (err) {
            console.log(err.stack);
            res.sendStatus(500)
        }
        finally {
            res.sendStatus(200);
        }
    },

    async GetPoll(req, res) {
        const collection = await Connect(); //connect to the database
        try {

            // Find the poll with the id from the GET request 
            const myDoc = await collection.findOne({ "_id": ObjectId(req.params.id) });

            //send it back to the client
            res.send(myDoc);
        }
        catch (err) {
            console.log(err.stack);
        }
    },

    async GetAllPolls(req, res) {
        const collection = await Connect(); //connect to the database
        try {

            // Find all the polls
            const pollDocs = await collection.find({}).sort({ "DatePublished": -1 }).toArray();

            //send polls back to the client
            res.send(pollDocs);

        }
        catch (err) {
            console.log(err.stack);
        }
    },

    async GetPollHistory(req, res) {
        const collection = await Connect(); //connect to the database
        try {

            // Find all the polls
            const pollDocs = await collection.find({},
                {
                    projection: {
                        "Data.partyLabel": 1,
                        "Data.pointsValue": 1,
                        "DatePublished": 1,
                        "_id": 0
                    }
                }).sort({ datePublished: -1 }).toArray();

            let pointsGroupedByDate = [];

            /* group the poll data by date in the following format:
            [
                {
                    "DatePublished": "2021-03-01T00:00:00.000Z",
                    "CON": 40,
                    "LAB": 30,
                    ...
                },
            ]
            */
            pollDocs.forEach(poll => {
                let pollObject = {};
                pollObject.DatePublished = poll.DatePublished;
                poll.Data.forEach(party => {
                    pollObject[party.partyLabel] = party.pointsValue;
                })
                pointsGroupedByDate.push(pollObject);
            });

            //sort the data by date ascending
            pointsGroupedByDate.sort((a, b) => {
                return new Date(a.DatePublished) - new Date(b.DatePublished);
            });

            //format the date to be more readable
            pointsGroupedByDate.forEach(item => {
                item.DatePublished = moment(item.DatePublished).format('DD/MM/YYYY');
            })

            console.log(pointsGroupedByDate);

            //send polls back to the client
            res.send(pointsGroupedByDate);
        }
        catch (err) {
            console.log(err.stack);
        }
    }
}

