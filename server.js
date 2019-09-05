const logger = require('./logger/logger');
var express = require('express'),
    app = express(),
    Promise = require('bluebird'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Running = require('./api/models/runningChallengeModel'),
    bodyParser = require('body-parser');


//mongoose instance connection url connection
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/Runnings')
    .then(() => {
        logger.info(`Connected on port: ${port}`);
        Promise.resolve();
    })
    .catch((err) => {
        logger.info('Not connected: ', err.message);
        Promise.reject(console.log('Not connected: ', err.message));
    })

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/runningChallengeRoute');
routes(app);

app.listen(port);