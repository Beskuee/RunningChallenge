'use strict';
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RunningSchema = new Schema({
    startDate: {
        type: Date,
        default: Date.now
    },
    stopDate: {
        type: Date,
        default: Date.now
    },
    numberCaloriesBurnt: {
        type: Number,
        default: 0
    },
    numberKmRan: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Running', RunningSchema, 'appRunning');

module.exports.format = function _runningFormatter(running) {
    // _.unset(running,
    //   '__v',
    //   '_id');
    return _.pick(running,
        '_id',
        'numberCaloriesBurnt',
        'numberKmRan',
        'startDate',
        'stopDate')
    ;
};