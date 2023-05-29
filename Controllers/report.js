const report = require("../Models/report");
const response = require("../Models/response");
const moment = require('moment');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');
const iso = require("../Models/iso");


const GetAll = async (req, res) => {

    let existreports
    try {
        // existresponses = await report.deleteMany({});
        existreports = await report.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    return res.status(200).json({ success: true, message: 'success', data: existreports });

}

const generatePDF = async (req, res) => {
    const { userid, isoid } = req.params;

    let existresponses
    try {
        existresponses = await response.find({ userid }).populate('questionid', 'question');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }
    
    let existiso
    try {
        existiso = await iso.findById(isoid);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }

    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');


    let date = `${day}_${month}_${year}__${hours}_${minutes}`;
    let fileName = `${existiso.iso}_${userid}_${date}.pdf`;
    const Newdocument = new report({
        date: moment().format('L'),
        document: fileName,
        isoid,
        userid,
    });

    try {
        await Newdocument.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something when wrong while extracting data', error: error })
    }


    ejs.renderFile(
        path.join(__dirname, "../templates", "Report.ejs"),
        {
            responses: existresponses, date: moment().subtract(10, 'days').calendar(), iso: existiso.iso
        },
        (err, data) => {
            if (err) {
                return console.log(err);
            }

            let options = {
                height: "11.25in",
                width: "8.5in",
                header: {
                    height: "10mm"
                },
                footer: {
                    height: "10mm"
                }
            };

            pdf.create(data, options).toFile(`./uploads/files/${fileName}`, (err, data) => {
                if (err) {
                    return console.log(err);
                }

                console.log("done")
            })
        }
    )

    return res.status(201).json({ success: true, message: 'success', data: Newdocument });
}

exports.generatePDF = generatePDF
exports.GetAll = GetAll