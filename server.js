var express = require('express'),
    app = express(),
    port = process.env.PORT ||3000,
    mongoose = require ('mongoose'),
    Task = require ('./api/models/runningChallengeModel'),
    bodyParser = require('body-parser');


//mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/runningChallengeRoute');
routes(app);

    app.listen(port);


    console.log('----Application is running on port: ', port);