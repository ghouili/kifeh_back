const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');

const UseRouter = require('./Routes/user');
const IsoRouter = require('./Routes/iso');
const PratiqueRouter = require('./Routes/pratique');
const QuestionRouter = require('./Routes/question');
const ResponseRouter = require('./Routes/response');
const ResportRouter = require('./Routes/report');

const server = express();
const PORT = 5000;

server.use(bodyparser.json());
server.use(cors());

server.use("/uploads/images", express.static(path.join("uploads", "images")));
server.use("/uploads/files", express.static(path.join("uploads", "files")));
server.get('/', (req, res) => {
    res.send('Hello Kifeh BC!');
});

server.use('/user', UseRouter);
server.use('/iso', IsoRouter);
server.use('/pratique', PratiqueRouter);
server.use('/question', QuestionRouter);
server.use('/response', ResponseRouter);
server.use('/report', ResportRouter);

mongoose.connect('mongodb+srv://admin:admin@cluster0.4y5y0c5.mongodb.net/?retryWrites=true&w=majority')
.then(res => server.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
.catch(err => console.log(err));
