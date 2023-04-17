const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, unique: true},
    cin: {type: String },
    password: {type: String },
})

module.exports = mongoose.model('user', UserSchema);