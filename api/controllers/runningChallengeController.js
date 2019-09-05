'use strict';
const _ = require('lodash');
const Run = require('../models/runModel');
const logger = require('../../logger/logger');


var mongoose = require('mongoose'),
    Running = mongoose.model('Running');

// findAll
exports.listAllRunnings = function (req, res) {
    Running.find({}, function (err, running) {
        if (err) {
            res.status(400).send(err);
            return;
        }

        const dataTosend = _.map(running, (obj)=> new Run(obj));
        logger.info('--------dataToSend-----------');
        return res.status(200).json(dataTosend);
    });
};

// create
exports.createARunning = function (req, res) {
    var running = new Running(req.body);
    running.save(function (err, running) {
        if (err) {
            res.status(400).send(err);
            return;
        }

        return res.status(200).json(new Run(running));
    });
};

// get average
exports.getAverageKmRanByDate = function (req, res) {
    const startDate = new Date(req.body.startDate);
    const stopDate = new Date(req.body.stopDate);

    Running.find({$and: [{startDate: { '$gte': startDate }}, {stopDate : {'$lte': stopDate}}]}, function (err, running) {
        if (err) {
            res.send(err);
            return;
        }

        const kmRanList = _.map(running, (obj)=> _.get(obj, 'numberKmRan'));
        const calorieBurntList = _.map(running, (obj)=> _.get(obj, 'numberCaloriesBurnt'));

        res.status(200).json({
            km_mean : _.mean(kmRanList),
            calorie_mean : _.mean(calorieBurntList),
        });
    });

}