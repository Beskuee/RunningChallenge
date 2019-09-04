'use strict';
const _ = require('lodash');

var mongoose = require('mongoose'),
    Running = mongoose.model('Runnings');

// convert to json object of interest
function runningJsonConverter(running) {
    return _.pick(running,
        'name',
        'numberKmRan',
        'numberCaloriesBurnt',
        'startDate',
        'stopDate')
    ;
}

// findAll
exports.listAllRunnings = function (req, res) {
    Running.find({}, function (err, running) {
        if (err) {
            res.send(err);
            return;
        }

        const dataTosend = _.map(running, (obj)=> runningJsonConverter(obj));

        return res.json(dataTosend);
    });
};

// create
exports.createARunning = function (req, res) {
    var new_running = new Running(req.body);
    new_running.save(function (err, running) {
        if (err) {
            res.send(err);
        }

        const dataTosend = runningJsonConverter(running);

        return res.json(dataTosend);

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

        res.json({
            km_mean : _.mean(kmRanList),
            calorie_mean : _.mean(calorieBurntList),
        });
    });

}