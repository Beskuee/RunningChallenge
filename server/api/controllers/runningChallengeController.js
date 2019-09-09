'use strict';
const _ = require('lodash');
const logger = require('../../logger/logger');
const moment = require('moment');

let mongoose = require('mongoose'),
    Running = mongoose.model('Running');

// findAll
exports.listAllRunnings = function (req, res) {
    logger.info('findAll');
    Running.find({})
        .then((running) => {
            // todo use _.unset for format
            const dataTosend = _.map(running, (obj) => Running.format(obj));
            return res.status(200).json(dataTosend);
        })
        .catch((err) => {
            return res.status(400).send(err);
        })
    ;
};

function _checkDateFormat(date) {
    // YYYY-MM-DDTHH:MM:SS.sssZ
    const FORMAT_DATE = 'YYYY-MM-DD';
    const result = moment(date, FORMAT_DATE).isValid();

    if(!result){
        logger.error(`Format de date incorrecte, format requis : ${FORMAT_DATE}`);
        throw (`Format de date incorrect, format requis : ${FORMAT_DATE}`);
    }
}

function _checkDateIntegrity(req) {

    const startDate = moment(req.body.startDate).format('YYYY-MM-DD');
    _checkDateFormat(startDate);

    const stopDate = moment(req.body.stopDate).format('YYYY-MM-DD');
    _checkDateFormat(stopDate);

    if (moment(startDate).isAfter(stopDate)){
        logger.error('starDate ne doit pas etre anterieur a stopDate');
        throw ('starDate ne doit pas etre anterieur a stopDate');
    }

    logger.info('dateStart and dateStop are correct');
}

// create
exports.createARunning = function (req, res) {

    _checkDateIntegrity(req);

    let running = new Running(req.body);
    running.save()
        .then((running) => {
            logger.info(`create: ${running._id}`);

            // todo use _.unset for format
            return res.status(200).json(Running.format(running));
        })
        .catch((err) => {
            return res.status(400).send(err.message);
        })
    ;
};

// get average
exports.getAverageKmRanByDate = function (req, res) {
    logger.info('getAverageKm');

    if(!_.has(req, 'body') || _.isEmpty(req.body) || (!_.has(req.body, 'startDate') || !_.has(req.body, 'stopDate'))){
        logger.error('Il manque la donnee startDate ou stopDate pour la requete');
        throw (`Il manque la donnee startDate ou stopDate pour la requete`);
    }

    _checkDateIntegrity(req)

    const startDate = moment(req.body.startDate).format('YYYY-MM-DD');
    const stopDate = moment(req.body.stopDate).format('YYYY-MM-DD');

    Running.find({$and: [{startDate: {'$gte': startDate}}, {stopDate: {'$lte': stopDate}}]})
        .then((running) => {
            const kmRanList = _.map(running, (obj) => _.get(obj, 'numberKmRan'));
            const calorieBurntList = _.map(running, (obj) => _.get(obj, 'numberCaloriesBurnt'));

            res.status(200).json({
                km_mean: _.mean(kmRanList),
                calorie_mean: _.mean(calorieBurntList),
            });
        })
        .catch((err) => {
            return res.status(400).send(err.message);
        })
    ;
};