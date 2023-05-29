const mongoose = require('mongoose');

const responseSchema = mongoose.Schema({
    response: { type: String, required: true },
    conclusion: { type: String, required: true },
    recommendation: { type: String, required: true },
    userid:{ type: mongoose.Types.ObjectId, required: true, ref: "user" },
    questionid:{ type: mongoose.Types.ObjectId, required: true, ref: "question" },
});

module.exports = mongoose.model('response', responseSchema);