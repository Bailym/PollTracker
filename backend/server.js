const express = require('express')
const app = express()
const port = 3001
const path = require('path')
var bodyParser = require('body-parser');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//controllers
var pollsController = require("./Controllers/PollsController");

//Polls endpoints
app.post('/api/polls/add', pollsController.AddPoll);  //retrieves all users
//app.get('/api/polls/:id', pollsController);  //retrieves specific user by id


app.listen(port, () => console.log(`Listening on port: ${port}`))

module.exports.app = app;