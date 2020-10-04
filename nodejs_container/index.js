const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

app.use(morgan('dev'));

mongoose
    .connect(
        'mongodb://mongo:27017/test',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.status(200).json({ "test": "c" })
})


app.listen(9000, () => console.log("test"))