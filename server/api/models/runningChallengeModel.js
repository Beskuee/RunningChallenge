'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var RunningSchema = new Schema({
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

var Running = module.exports = mongoose.model('Running', RunningSchema);

module.exports.format = function _runningFormatter (running) {
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