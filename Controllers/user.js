const user = require('../Models/user');

const bcrypt = require('bcryptjs');

const Register = async (req, res) => {
    const { name, email, cin, password } = req.body;

    let userExist;
    try {
        userExist = await user.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something went wrong with the server', data: error });
    }

    if (userExist) {
        return res.status(200).json({ success: false, message: 'User Already Exisit!!', data: userExist });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
        name,
        email,
        cin,
        password: hashedPassword
    });

    try {
        await newUser.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something went wrong with the server while savin new user', data: error });
    }

    return res.status(201).json({ success: true, message: 'User Added succesfully!!!', data: newUser });


}

const Login = async (req, res) => {
    // data recieve
    const { email, password } = req.body;

    //check is email exist
    let userExist;
    try {
        userExist = await user.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something went wrong with the server', data: error });
    }

    if (!userExist) {
        return res.status(200).json({ success: false, message: 'User doesn"t Exisit!!' });
    }

    //compare password
    const compare = await bcrypt.compare(password, userExist.password);

    //access or refuse
    if (!compare) {
        return res.status(200).json({ success: false, message: 'Check your Password!!' });
    }

    return res.status(200).json({ success: true, message: `Welcome Mr/Mrs ${userExist.name}`, data: userExist });

}

const GetAll = async (req, res) => {

    let userExist;
    try {
        userExist = await user.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something went wrong with the server', data: error });
    }

    return res.status(200).json({ success: true, message: `success`, data: userExist });
}

const FindById = async (req, res) => {

    const { id } = req.params;

    let userExist;
    try {
        userExist = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something went wrong with the server', data: error });
    }

    if (!userExist) {
        return res.status(200).json({ success: false, message: 'User doesn"t Exisit!!' });
    }

    return res.status(200).json({ success: true, message: `success`, data: userExist });
}

const Delete = async (req, res) => {
    const { id } = req.params;

    let userExist;
    try {
        userExist = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'something went wrong with the server', data: error });
    }

    if (!userExist) {
        return res.status(200).json({ success: false, message: 'User doesn"t Exisit!!' });
    }

    try {
        await userExist.deleteOne();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'something went wrong with the server while deleting existing user', data: error });
    }

    return res.status(200).json({ success: true, message: 'User deleted succesfully!!!' });
}

const Update = async (req, res) => {
    //recieve data
    //findByID
    //update data
    //save

}


exports.Register = Register
exports.Login = Login
exports.Update = Update
exports.GetAll = GetAll
exports.FindById = FindById
exports.Delete = Delete