const mongo = require ('../Database.js')
const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://Admin:omF2Vr1IlQFj7tcr@polltrackercluster.oke1med.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function Connect() {
    try {
        await client.connect();
        const db = client.db("PollTrackerCluster");

        // Use the collection "people"
        return(db.collection("polls"));

    } catch (err) {
        console.log(err.stack);
    }
}


async function AddPoll() {

    const collection = await Connect();

    try {
        //construct a document
        let pollDocument = {
            "Source": "YouGov",
            "DatePublished": new Date(2022, 10, 21),
            "SurveyDate": { "StartDate": null, "EndDate": null },
            "ChangesWith": null,
            "Data": [
                {
                    "Party": "CON",
                    "Points": 19,
                },
                {
                    "Party": "LAB",
                    "Points": 56,
                },
                {
                    "Party": "LDEM",
                    "Points": 10,
                },
                {
                    "Party": "GRN",
                    "Points": 4,
                },
                {
                    "Party": "REF",
                    "Points": 5,
                }
            ]
        }

        // Insert a single document, wait for promise so we can read it back
        const doc = await collection.insertOne(pollDocument);
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

AddPoll().catch(console.dir);
