const express = require('express');
const bodyParser = require('body-parser')

const moviesRouter = require('./movies');

const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header('Content-Type', 'application/json');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({message: 'This server works'}));

app.use(moviesRouter);

app.listen(3000, () => console.log('Server listening on port 3000!'));