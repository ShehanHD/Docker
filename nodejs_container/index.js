const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).json({ "test": "c" })
})


app.listen(9000, () => console.log("test"))