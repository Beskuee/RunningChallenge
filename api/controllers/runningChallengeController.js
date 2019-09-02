'use strict';
const _ = require('lodash');

var mongoose = require('mongoose'),
Task = mongoose.model('Tasks');


exports.list_all_tasks = function (req, res) {
    Task.find({}, function (err, task) {
        if (err) {
            res.send();
        }
        res.json(task);
    });
};

exports.create_a_task = function (req, res) {
    var new_task = new Task(req.body);
    new_task.save(function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
};

exports.getAverageKmRanByDate = function (req, res) {
    //faire un _.get avec loadash
    const startDate = new Date(req.body.startDate);
    const stopDate = new Date(req.body.stopDate);

    Task.find({ startDate: { '$gte': startDate }} && {stopDate : {'$lte': stopDate}}, function (err, task) {
        if (err) {
            res.send(err);
        }
        let listKm = [];
        _.map(task, (obj)=>{
            listKm.push(_.get(obj, 'numberKmRan'))
        });

        let listCalorie = [];
        _.map(task, (obj)=>{
            listCalorie.push(_.get(obj, 'numberCaloriesBurnt'))
        })


        console.log('---listKm---', listKm);
        console.log('---listCalorie---', listCalorie);

        res.json({
            km_mean : _.mean(listKm),
            calorie_mean : _.mean(listCalorie),
        });
    });

}