const config = require('../config');
const pgp = require('pg-promise')()
// const db = pgp(config.URL_CREDENTIAL)
const db = pgp('postgres://schtelemetria:Sch3m@T3l3m3tr1@@localhost:5432/dbtelemetria')
module.exports = db;
