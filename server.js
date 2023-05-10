const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');

const UseRouter = require('./Routes/user');

const server = express();
const PORT = 5000;

server.use(bodyparser.json());
server.use(cors());

server.use("/uploads/images", express.static(path.join("uploads", "images")));
server.get('/', (req, res) => {
    res.send('Hello Kifeh BC!');
});

server.use('/user', UseRouter);

mongoose.connect('mongodb+srv://admin:admin@cluster0.4y5y0c5.mongodb.net/?retryWrites=true&w=majority')
.then(res => server.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
.catch(err => console.log(err));
