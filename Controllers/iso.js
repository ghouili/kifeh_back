const iso = require('../Models/iso');

const GetAll = async (req, res) => {

    let existisos
    try {
        // existresponses = await iso.deleteMany({});
        existisos = await iso.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existisos });

}

const Add = async (req, res) => {

    const { userid } = req.body;

    const Newiso = new iso({
       iso: req.body.iso,
       userid,
       pratiqueids:[]
    });

    try {
        await Newiso.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    
    return res.status(201).json({ success: true, message: 'success', data: Newiso });
}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existiso
    try {
        existiso = await iso.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existiso) {
        return res.status(200).json({ success: false, messgae: 'iso doesnt exist!!', error: false });
    }

    return res.status(200).json({ success: true, message: 'success', data: existiso });

}

const Update = async (req, res) => {

    const { id } = req.params;

    let existiso
    try {
        existiso = await iso.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existiso) {
        return res.status(200).json({ success: false, messgae: 'iso doesnt exist!!', error: false });
    }

   
    existiso.iso = req.body.iso;
    

    try {
        await existiso.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error.errors })
    }

    return res.status(200).json({ success: true, message: 'success', data: existiso });
}

const Delete = async (req, res) => {

    const { id } = req.params;

    let existiso
    try {
        existiso = await iso.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    if (!existiso) {
        return res.status(200).json({ success: false, messge: 'iso doesnt exist!!', error: false });
    }

    try {
        await existiso.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    return res.status(200).json({ success: true, message: 'iso Deleted Successfully' });

}

exports.Add = Add
exports.GetAll = GetAll
exports.FindById = FindById
exports.Update = Update
exports.Delete = Delete