const winston = require('winston');

function manageErrors(response, { messageToLog, dataToLog }, err) {
    winston.error(messageToLog, Object.assign({ error: err.message }, dataToLog));
    winston.error(err);
    response.status(500).json(err.message)
}

module.exports = {
    manageErrors,
};