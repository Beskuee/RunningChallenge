'use strict';
const _ = require('lodash');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let RunningSchema = new Schema({
    name: {
        type: String,
        required: 'enter the name'
    },
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
        'numberCaloriesBurnt',
        'numberKmRan',
        'name',
        'startDate',
        'stopDate')
        ;
};