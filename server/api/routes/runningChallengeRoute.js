'use strict';

module.exports = function (app) {
    const running = require('../controllers/runningChallengeController');
    const health = require('../controllers/healthCheckController');


    // running route
    app.route('/runnings')
        .get(running.listAllRunnings)
        .post(running.createARunning);

    app.route('/average_km_ran')
        .post(running.getAverageKmRanByDate);

    // health check
    app.route("/health")
        .get(health.getHealth);

    // fusion controller and route?
    app.route('/health2')
        .get(function (req, res) {
            console.log('balblabla')
            return res.status(200).send('blop')
        })
};


