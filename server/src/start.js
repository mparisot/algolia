const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');

require('./DbManager');
const routes = require('./routes');

const SERVER_PORT = 3000;

winston.info('Starting the app');

const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.header('Content-Type', 'application/json');
    next();
});

winston.info('Express default headers defined');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

winston.info('Express default parsers defined');

winston.info('Adding routes');

app.get('/', (req, res) => res.json({message: 'This server works'}));
winston.info('Root route added');

Object.keys(routes).forEach(routeName => {
    app.use(routes[routeName]);
    winston.info('Route added :', routeName);
});

app.listen(SERVER_PORT, () => winston.log('info', 'Server started', { port: SERVER_PORT }));