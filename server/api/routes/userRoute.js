'use strict';

module.exports = function (app) {
    const user = require('../controllers/userController');
    const auth = require('../authorization/middlewares/authentification');

    // user route
    app.route('/users')
        .post(user.insert)
        .get(user.list);

    app.route('/users/:userId')
        .get(user.getById)
        .patch(user.patchById)
        .delete(user.removeById);

    app.route('/auth')
        .post(function (req, res) {
            console.log('auth');
            auth.isPasswordAndUserMatch,
                user.login
            return res.status(200).json('blopblop');
        });

    // // mettre à true ou false quand c'est checked
    // app.route('user/checkAuth')
    //     .get(user.checkAuth);
};