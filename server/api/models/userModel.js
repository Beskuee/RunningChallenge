'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// todo creer un nouveau module pour l'authen
let UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
})

module.exports = mongoose.model('Users', UserSchema, 'appRunning');
