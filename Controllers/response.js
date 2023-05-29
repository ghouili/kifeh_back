const iso = require('../Models/iso');
const question = require('../Models/question');
const response = require('../Models/response');

const GetAll = async (req, res) => {

    let existresponses
    try {
        // existresponses = await response.deleteMany({});
        existresponses = await response.find().populate('questionid', 'question');
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existresponses });

}

const GetUser = async (req, res) => {

    let { id } = req.params;

    let existresponses
    try {
        existresponses = await response.find({ userid: id }).populate('questionid', 'question');
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existresponses });

}

const Add = async (req, res) => {

    const {
        userid,
        questionid,
    } = req.body;

    let existquestion
    try {
        existquestion = await question.findById(questionid);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    // console.log(existquestion);

    const Newresponse = new response({
        response: req.body.response,
        conclusion: existquestion.conclusion,
        recommendation: existquestion.recommendation,
        userid,
        questionid,
    });

    try {
        await Newresponse.save();
        existquestion.responseids.push(Newresponse);
        await existquestion.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }


    return res.status(201).json({ success: true, message: 'success', data: Newresponse });
}

const Update = async (req, res) => {

    const { id } = req.params;

    let existresponse
    try {
        existresponse = await response.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existresponse) {
        return res.status(200).json({ success: false, messgae: 'response doesnt exist!!', error: false });
    }

   
    existresponse.response = req.body.response;
    

    try {
        await existresponse.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error.errors })
    }

    return res.status(200).json({ success: true, message: 'success', data: existresponse });
}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existresponse
    try {
        existresponse = await response.findById(id).populate('questionid', 'question');
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existresponse) {
        return res.status(200).json({ success: false, messgae: 'response doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existresponse });

}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existresponse
    try {
        existresponse = await response.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existresponse) {
        return res.status(200).json({ success: false, messge: 'response doesnt exist!!', error: false });
    }

    try {
        await existresponse.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'response Deleted Successfully' });

}

exports.Add = Add
exports.GetAll = GetAll
exports.GetUser = GetUser
exports.Update = Update
exports.FindById = FindById
exports.Delete = Delete