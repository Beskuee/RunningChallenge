'use strict';

module.exports = function (app) {
    const user = require('../controllers/userController');

    // user route
    app.route('/users')
        .post(user.insert);

    // // mettre à true ou false quand c'est checked
    // app.route('user/checkAuth')
    //     .get(user.checkAuth);
};