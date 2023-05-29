const iso = require('../Models/iso');
const pratique = require('../Models/pratique');

const GetAll = async (req, res) => {

    let existpratiques
    try {
        // existresponses = await pratique.deleteMany({});
        existpratiques = await pratique.find().populate('isoid', 'iso');
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existpratiques });

}

const Add = async (req, res) => {
console.log(req.body);
    const {
        isoid,
        userid,
    } = req.body;

    const Newpratique = new pratique({
        pratique: req.body.pratique,
        isoid,
        userid,
        questionids: []
    });

    let existiso
    try {
        existiso = await iso.findById(isoid);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }


    try {
        await Newpratique.save();
        existiso.pratiqueids.push(Newpratique);
        await existiso.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }


    return res.status(201).json({ success: true, message: 'success', data: Newpratique });
}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existpratique
    try {
        existpratique = await pratique.findById(id).populate('isoid', 'iso');
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existpratique) {
        return res.status(200).json({ success: false, messgae: 'pratique doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existpratique });

}

const Update = async (req, res) => {

    const { id } = req.params;

    let existpratique
    try {
        existpratique = await pratique.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existpratique) {
        return res.status(200).json({ success: false, messgae: 'pratique doesnt exist!!', error: false });
    }


    existpratique.pratique = req.body.pratique;


    try {
        await existpratique.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error.errors })
    }

    return res.status(200).json({ success: true, message: 'success', data: existpratique });
}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existpratique
    try {
        existpratique = await pratique.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existpratique) {
        return res.status(200).json({ success: false, messge: 'pratique doesnt exist!!', error: false });
    }

    try {
        await existpratique.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'pratique Deleted Successfully' });

}

exports.Add = Add
exports.GetAll = GetAll
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete