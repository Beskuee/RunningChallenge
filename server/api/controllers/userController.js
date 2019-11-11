const mongoose = require('mongoose'),
    User = mongoose.model('Users');
const crypto = require('crypto');
const logger = require('../../logger/logger');
const jwtSecret = require('jwt-secret');
const _ = require('lodash');

//import authorization
let isAuthChecked = false;

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
        .update(req.body.password)
        .digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

// todo function fléchée createUser = (userData) => {}
function createUser (userData) {
    const user = new User(userData);
    return user.save();
};

exports.getById = (req, res) => {
    logger.info('getById');
    findById(req.params.userId).then((result) => {
        res.status(200).send(result);
    });
}

function findById (id) {
    return User.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

exports.patchById = (req, res) => {
    logger.info('patchId');
    if(req.body.password){
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512',salt)
            .update(req.body.password)
            .digest("base64");
        req.body.password = salt + "$" + hash;
    }
    patchUser(req.params.userId, req.body).then((result) => {
        res.status(204).send({});
    })
}

function patchUser (id, userData) {
    return new Promise((res, rej) => {
        User.findById(id, function (err, user) {
            if(err) rej(err);
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.save(function (err, updatedUser) {
                if (err) return rej(err);
                res(updatedUser);
            })
        })
    })
}

exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        let b = new Buffer(hase);
        let refresh_token = b.toString('base64');
        res.status(201).send({accessToken: token, refreshToken: refresh_token});
    } catch(err) {
        res.status(500).send({errors:err});
    }
}

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    listUser (limit, page).then((result) => {
        const resultFiltered = result.filter(user => _.get(user, 'email'))
        res.status(200).send(resultFiltered);
    })
};

function listUser (perPage, page) {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.removeById = (req, res) => {
    removeUser(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};

function removeUser (userId) {
    return new Promise((resolve, reject) => {
        User.deleteOne({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};





// exports.getHealthAfterAuthChecked = function (res, req) {
//     if(!isAuthChecked){
//         return res.code(500).send('not Authorized');
//     }
//
//     getHealthForCheck(res, req);
// };