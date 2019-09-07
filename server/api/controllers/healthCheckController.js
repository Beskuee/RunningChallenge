let connectionDbState = require('../../server');

exports.getHealth = function (req, res) {
    return res.json({
        appStatus: 'UP',
        dbStatus: connectionDbState
    })
}