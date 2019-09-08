const logger = require('./logger/logger');
const config = require('./config/config');

var express = require('express'),
    app = express(),
    port = config.app.port,
    mongoose = require('mongoose'),
    Running = require('./api/models/runningChallengeModel'),
    bodyParser = require('body-parser');

const { db: { host, name } } = config;
const connectionString = `mongodb://${host}/${name}`;
const dbUri = connectionString;

const timeoutConnectionConfig = 10000;
let connectionDbState = 'Down';

this.connectionDbState = connectionDbState;

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
            this.connectionDbState = 'Up';
        })
        .catch((err) => {
            logger.info(`Not connected: ${err.message}`);
            this.connectionDbState = 'Down';
        })
}

connectToBdd();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/runningChallengeRoute');
routes(app);

app.listen(port);

