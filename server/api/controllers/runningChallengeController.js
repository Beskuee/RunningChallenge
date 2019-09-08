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

// create
exports.createARunning = function (req, res) {
    logger.info(`create: ${req.body.name}`);
    let running = new Running(req.body);
    running.save()
        .then((running) => {
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
    const startDate = new Date(req.body.startDate);
    const stopDate = new Date(req.body.stopDate);

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