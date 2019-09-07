'use strict';

module.exports = function (app) {
    var running = require('../controllers/runningChallengeController');
    var health = require('../controllers/healthCheckController');


    // running route
    app.route('/runnings')
        .get(running.listAllRunnings)
        .post(running.createARunning);

    app.route('/average_km_ran')
        .post(running.getAverageKmRanByDate);

    // health check
    app.route("/health")
        .get(health.getHealth);
};
