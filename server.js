const logger = require('./logger/logger');
var express = require('express'),
    app = express(),
    Promise = require('bluebird'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Running = require('./api/models/runningChallengeModel'),
    bodyParser = require('body-parser');


const dbUri = 'mongodb://localhost/Runnings';
const timeoutConnectionConfig = 10000;
let connectionDbState = 'Down';

module.exports = connectionDbState;

mongoose.Promise = Promise;

// reconnection if failed
var dbConnection = mongoose.connection;
dbConnection.on('disconnected', function() {
    logger.info('MongoDB disconnected!');
    connectionDbState = 'Down';
    setTimeout(() => connectToBdd(), timeoutConnectionConfig)
});

function connectToBdd() {
    mongoose.connect(dbUri)
        .then(() => {
            connectionDbState = 'Up';
            logger.info(`Connected on port: ${port}`);
        })
        .catch((err) => {
            logger.info(`Not connected: ${err.message}`);
        })
}

connectToBdd();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/runningChallengeRoute');
routes(app);

app.listen(port);