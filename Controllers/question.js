const iso = require('../Models/iso');
const pratique = require('../Models/pratique');
const question = require('../Models/question');
const response = require('../Models/response');

const GetAll = async (req, res) => {

    let existquestions
    try {
        // existresponses = await question.deleteMany({});
        existquestions = await question.find().populate('pratiqueid', 'pratique');
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existquestions });

}

// GET endpoint to fetch questions based on ISO
const GetISO = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the ISO document based on the provided ISO value
        const isoDocument = await iso.findById(id);

        if (!isoDocument) {
            return res.status(404).json({ error: 'ISO not found' });
        }

        // Find the questions associated with the ISO
        const questions = await question.find({ pratiqueid: { $in: isoDocument.pratiqueids } }).populate('pratiqueid', 'pratique');

        return res.status(200).json({ success: true, message: 'success', data: questions });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const Add = async (req, res) => {

    const {
        conclusion,
        recommendation,
        userid,
        pratiqueid
    } = req.body;

    const Newquestion = new question({
        question: req.body.question,
        conclusion,
        recommendation,
        userid,
        pratiqueid,
        responseids: []
    });

    let existpratique
    try {
        existpratique = await pratique.findById(pratiqueid);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }


    try {
        await Newquestion.save();
        existpratique.questionids.push(Newquestion);
        await existpratique.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }


    return res.status(201).json({ success: true, message: 'success', data: Newquestion });
}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existquestion
    try {
        existquestion = await question.findById(id).populate('pratiqueid', 'pratique');
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existquestion) {
        return res.status(200).json({ success: false, messgae: 'question doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existquestion });

}

const Update = async (req, res) => {

    const {
        conclusion,
        recommendation, } = req.body;
    const { id } = req.params;

    let existquestion
    try {
        existquestion = await question.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existquestion) {
        return res.status(200).json({ success: false, messgae: 'question doesnt exist!!', error: false });
    }


    existquestion.question = req.body.question;
    existquestion.conclusion = conclusion;
    existquestion.recommendation = recommendation;


    try {
        await existquestion.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error.errors })
    }

    return res.status(200).json({ success: true, message: 'success', data: existquestion });
}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existquestion
    try {
        existquestion = await question.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existquestion) {
        return res.status(200).json({ success: false, messge: 'question doesnt exist!!', error: false });
    }

    try {
        await existquestion.deleteOne();
        await response.deleteMany({ responseids: id });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'question Deleted Successfully' });

}

exports.Add = Add
exports.GetAll = GetAll
exports.GetISO = GetISO
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete