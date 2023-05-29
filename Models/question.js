const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    question: { type: String, required: true },
    conclusion: { type: String, required: true },
    recommendation: { type: String, required: true },
    userid: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    pratiqueid: { type: mongoose.Types.ObjectId, required: true, ref: "pratique" },
    responseids: [{ type: mongoose.Types.ObjectId, required: true, ref: "response" }],
});

module.exports = mongoose.model('question', questionSchema);