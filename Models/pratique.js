const mongoose = require('mongoose');

const pratiqueSchema = mongoose.Schema({
    pratique: { type: String, required: true },
    isoid:{ type: mongoose.Types.ObjectId, required: true, ref: "iso" },
    userid:{ type: mongoose.Types.ObjectId, required: true, ref: "user" },
    questionids:[{ type: mongoose.Types.ObjectId, required: true, ref: "question" }],
});

module.exports = mongoose.model('pratique', pratiqueSchema);