const express = require('express')
const app = express()
const port = 3001
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//controllers
const pollsController = require("./Controllers/PollsController");
const sourcesController = require('./Controllers/sourcesController');

//Polls endpoints
app.post('/api/polls/add', pollsController.AddPoll);  //adds a new poll
app.get('/api/polls/get/:id', pollsController.GetPoll);  //retreives a poll by id
app.get("/api/polls/get", pollsController.GetAllPolls); //retreives all polls"
app.get("/api/polls/gethistory", pollsController.GetPollHistory); //retreives all polls"
app.get("/api/sources/get", sourcesController.GetSources); //retreives all polls"

app.listen(port, () => console.log(`Listening on port: ${port}`))

module.exports.app = app;