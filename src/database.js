const config = require('../config');
const pgp = require('pg-promise')()
const db = pgp(config.URL_CREDENTIAL)
module.exports = db;
