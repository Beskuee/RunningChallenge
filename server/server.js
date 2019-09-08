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

this.connectionDbState = connectionDbState;

mongoose.Promise = Promise;

// reconnection if failed
var dbConnection = mongoose.connection;
dbConnection.on('disconnected', function() {
    logger.info('MongoDB disconnected!');
    setTimeout(() => connectToBdd(), timeoutConnectionConfig)
});

function connectToBdd() {
    mongoose.connect(dbUri)
        .then(() => {
            logger.info(`Connected on port: ${port}`);
            logger.debug('***********Application en mode dev*************')
            connectionDbState = 'Up';
        })
        .catch((err) => {
            logger.info(`Not connected: ${err.message}`);
            connectionDbState = 'Down';
        })
}

connectToBdd();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/runningChallengeRoute');
routes(app);

app.listen(port);

