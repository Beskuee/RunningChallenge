const mongoose = require('mongoose'),
    User = mongoose.model('Users');
const crypto = require('crypto');

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

createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.getById = (req, res) => {
    findById(req.params.userId).then((result) => {
        res.status(200).send(result);
    });
}

findById = (id) => {
    console.log('-----id', id);
    return User.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};



// exports.getHealthAfterAuthChecked = function (res, req) {
//     if(!isAuthChecked){
//         return res.code(500).send('not Authorized');
//     }
//
//     getHealthForCheck(res, req);
// };