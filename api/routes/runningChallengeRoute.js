'use strict';
const connectionDbState = require('../../server');

module.exports = function (app) {
    var running = require('../controllers/runningChallengeController')

    //todoListRoutes
    app.route('/runnings')
        .get(running.listAllRunnings)
        .post(running.createARunning);

    app.route('/average_km_ran')
        .post(running.getAverageKmRanByDate);

    //health check
    app.route("/health")
        .get(function (req, res) {
            return res.json({
                appStatus: 'UP',
                dbStatus : connectionDbState,
            });
        });
};
