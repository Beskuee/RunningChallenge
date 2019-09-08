exports.getHealth = function (req, res) {
    return res.json({
        appStatus: 'UP',
        dbStatus: this.connectionDbState,
    });
};
