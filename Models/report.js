const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    document: { type: String, required: true },
    date: { type: String, required: true },
    userid:{ type: mongoose.Types.ObjectId, required: true, ref: "user" },
    isoid:{ type: mongoose.Types.ObjectId, required: true, ref: "iso" },
});

module.exports = mongoose.model('report', reportSchema);