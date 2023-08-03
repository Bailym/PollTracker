const moment = require('moment'); //require
const { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectId;
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const mongoConnectionUrl = process.env.MONGO_URL;
const mongoClient = new MongoClient(mongoConnectionUrl);

async function GetPollsCollectionFromDatabase() {
    try {
        await mongoClient.connect();
        const pollTrackerDatabase = mongoClient.db("PollTrackerCluster");
        const pollsCollection = pollTrackerDatabase.collection("polls");
        return pollsCollection;
    }
    catch (err) {
        console.log(err.stack);
    }
}

/* group the poll data by date in the following format:
[
    {
        "DatePublished": "2021-03-01T00:00:00.000Z",
        "CON": 40,
        "LAB": 30,
        ...
    },
]    
Note that multiple polls on the same day will produce two different entries  */
function FormatAllPollTrendData(allPollTrendData) {
    let allFormattedPolls = [];

    allPollTrendData.forEach(poll => {
        let formattedPoll = formatPollingTrendEntry(poll);
        allFormattedPolls.push(formattedPoll);
    });

    const formattedPollsSortedByDate = SortPollsByDatePublished(allFormattedPolls);
    return formattedPollsSortedByDate;
}

function formatPollingTrendEntry(poll) {
    let currentFormattedPoll = {};

    let formattedDateEntry = FormatDatePublishedProperty(poll.DatePublished);
    currentFormattedPoll.DatePublished = formattedDateEntry;

    poll.Data.forEach(party => {
        let partyLabel = party.partyLabel;
        let pointsValue = party.pointsValue;
        currentFormattedPoll[partyLabel] = pointsValue;
    })

    return currentFormattedPoll;
}

function FormatDatePublishedProperty(poll) {
    const formattedDate = moment(poll.DatePublished).format('DD/MM/YYYY');
    return formattedDate;
}

function SortPollsByDatePublished(pollsToSort) {
    pollsToSort.sort((a, b) => {
        return new Date(a.DatePublished) - new Date(b.DatePublished);
    });

    return pollsToSort;
}

module.exports = {
    async AddNewPollToCollection(req, res) {
        try {
            const pollsCollection = await GetPollsCollectionFromDatabase();
            let nonZeroPartyDetails = req.body.partyDetails.filter(party => party.pointsValue !== null);
            let newPollDocumentToAdd = {
                "Source": req.body.sourceValue,
                "DatePublished": new Date(req.body.datePublishedValue),
                "SurveyDate": { "StartDate": new Date(req.body.startDateValue), "EndDate": new Date(req.body.endDate) },
                "ChangesWith": new Date(req.body.changesWithValue),
                "SampleSize": req.body.sampleSizeValue,
                "Data": nonZeroPartyDetails
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

    async GetPollByIdArg(req, res) {
        try {
            const pollsCollection = await GetPollsCollectionFromDatabase();
            const pollWithGivenId = await pollsCollection.findOne({ "_id": ObjectId(req.params.id) });
            res.send(pollWithGivenId);
        }
        catch (err) {
            console.log(err.stack);
        }
    },

    async GetAllPolls(req, res) {
        try {
            const pollsCollection = await GetPollsCollectionFromDatabase();
            const allPollsFromCollection = await pollsCollection.find({}).sort({ "DatePublished": -1 }).toArray();
            res.send(allPollsFromCollection);
        }
        catch (err) {
            console.log(err.stack);
        }
    },

    async GetPollingTrendData(req, res) {
        try {
            const pollsCollection = await GetPollsCollectionFromDatabase();
            const necessaryPollData = {
                "Data.partyLabel": 1,
                "Data.pointsValue": 1,
                "DatePublished": 1,
                "_id": 0
            }
            const AllPollingTrendData = await pollsCollection.find({}, { projection: necessaryPollData }).toArray();
            const FormattedPollingTrendData = FormatAllPollTrendData(AllPollingTrendData);
            res.send(FormattedPollingTrendData);
        }
        catch (err) {
            console.log(err.stack);
        }
    }
}

