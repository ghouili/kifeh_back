const user = require('../Models/user');

const bcrypt = require('bcryptjs');

const Example = (req, res) => {
    res.send('controller is working');
}

const Register = async (req, res) => {
    const { name, email, cin, password } = req.body;

    let userExist;
    try {
        userExist = await user.findOne({ email:email});
    } catch (error) {
        return res.status(500).json({success: false, message: 'something went wrong with the server', data: error});
    }
    
    if (userExist) {
        return res.status(200).json({success: false, message: 'User Already Exisit!!', data: userExist});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new user({
        name,
        email,
        cin,
        password: hashedPassword
    });

    try {
        newUser.save();
    } catch (error) {
        return res.status(500).json({success: false, message: 'something went wrong with the server while savin new user', data: error});
    }
    
    return res.status(201).json({success: true, message: 'User Added succesfully!!!', data: newUser});

    
}

const Login = async (req, res) => {
    // data recieve
    //check is email exist
    //compare password
    //access or refuse
}

exports.Example = Example
exports.Register = Register