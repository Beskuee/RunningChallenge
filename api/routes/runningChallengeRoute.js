'use strict';
module.exports = function (app) {
    var running = require('../controllers/runningChallengeController')

    //todoListRoutes
    app.route('/runnings')
        .get(running.listAllRunnings)
        .post(running.createARunning);

    app.route('/average_km_ran')
        .post(running.getAverageKmRanByDate);
};
