const express = require('express')
const app = express()
const port = 3001
const path = require('path')
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//controllers
var pollsController = require("./Controllers/PollsController");

//Polls endpoints
app.post('/api/polls/add', pollsController.AddPoll);  //adds a new poll
app.get('/api/polls/get/:id', pollsController.GetPoll);  //retreives a poll by id

app.listen(port, () => console.log(`Listening on port: ${port}`))

module.exports.app = app;