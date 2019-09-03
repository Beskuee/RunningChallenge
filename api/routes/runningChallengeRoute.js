'use strict';
module.exports = function (app) {
    var running = require('../controllers/runningChallengeController')

    //todoListRoutes
    app.route('/runnings')
        .get(running.listAllRunnings)
        .post(running.createARunning);

    app.route('/average_km_ran')
        .post(running.getAverageKmRanByDate);

    // app.route('./runnings/:runningId')
    //     .get(running.read_a_task)
    //     .put(running.update_a_task)
    //     .delete(running.delete_a_task)
};
