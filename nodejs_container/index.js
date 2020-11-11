const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

app.use(morgan('dev'));

mongoose.connect(
    'mongodb://localhost:27017/test',
    { useNewUrlParser: true }
)

const connection = mongoose.connection;

connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

app.get('/', (req, res) => {
    res.status(200).json({ "test": "d" })
})


app.listen(9000, () => console.log("test"))