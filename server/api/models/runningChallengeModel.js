'use strict';
const _ = require('lodash');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RunningSchema = new Schema({
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

module.exports = mongoose.model('Running', RunningSchema);

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