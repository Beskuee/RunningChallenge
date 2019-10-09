'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// todo creer un nouveau module pour l'authen
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
})

module.exports = mongoose.model('Users', UserSchema, 'appRunning');
