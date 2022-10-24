const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://Admin:omF2Vr1IlQFj7tcr@polltrackercluster.oke1med.mongodb.net/?retryWrites=true&w=majority";
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

        console.log(req.body)

        const collection = await Connect();

         try {
            //construct a document
            let pollDocument = {
                "Source": req.body.source,
                "DatePublished": new Date(req.body.datePublished),
                "SurveyDate": { "StartDate": new Date(req.body.startDate), "EndDate": new Date(req.body.endDate) },
                "ChangesWith": new Date(req.body.changesWith),
                "Data": req.body.parties
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

}

