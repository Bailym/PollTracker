const express = require('express')
const app = express()
const port = 3001
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//controllers
const pollsController = require("./Controllers/PollsController");
const sourcesController = require('./Controllers/sourcesController');
const RSSController = require('./Controllers/RSSController');

//Polls endpoints
app.post('/api/polls/add', pollsController.AddNewPollToCollection);
app.get('/api/polls/get/:id', pollsController.GetPollByIdArg);  
app.get("/api/polls/get", pollsController.GetAllPolls); 
app.get("/api/polls/gethistory", pollsController.GetPollingTrendData); 
app.get("/api/sources/get", sourcesController.GetAllSources);
app.get("api/rss/get", RSSController.GetRSSFeed);

app.listen(port, () => console.log(`Listening on port: ${port}`))

module.exports.app = app;