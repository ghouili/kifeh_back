const mongoose = require('mongoose');

const isoSchema = mongoose.Schema({
    iso: { type: String, required: true },
    userid:{ type: mongoose.Types.ObjectId, required: true, ref: "user" },
    pratiqueids:[{ type: mongoose.Types.ObjectId, required: true, ref: "pratique" }],
});

module.exports = mongoose.model('iso', isoSchema);