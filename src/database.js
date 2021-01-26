const { Client } = require('pg');

const dotenv = require('dotenv');

dotenv.config();

const database = new Client(process.env.PG_URL);

database.connect();

module.exports = database;