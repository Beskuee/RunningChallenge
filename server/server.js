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

// write log in file
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream('./server/logs' + '/debug.log', {flags : 'w'});

var log_stdout = process.stdout;

console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};