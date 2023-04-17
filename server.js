const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const UserRouter = require('./Routes/user');

const server = express();

server.use(bodyparser.json());
const PORT = 5000;

server.get('/', (req, res) => {
    res.send('Hello Kifeh BC!');
});

server.use('/user', UserRouter);

mongoose.connect('mongodb+srv://admin:admin@cluster0.4y5y0c5.mongodb.net/?retryWrites=true&w=majority')
.then(res => server.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
.catch(err => console.log(err));
