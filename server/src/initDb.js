const winston = require('winston');
const yargs = require('yargs').argv;

require('./DbManager');

const { initialImport } = require('./DataImporter');

winston.info('Starting the Db init');

initialImport(yargs.importFile).then(() => {
    winston.info('Import done');
    process.exit(0);
});