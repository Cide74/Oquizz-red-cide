/*
avec pg
const { Client } = require('pg');

const dotenv = require('dotenv');

dotenv.config();

const database = new Client(process.env.PG_URL);

database.connect();

module.exports = database;
*/


const { Sequelize } = require('sequelize');

const dotenv = require('dotenv');

dotenv.config();

//const sequelize = new Sequelize()
const sequelize = new Sequelize(process.env.DB_URL, {
    define: {
        // Boolean pour savoir si sequelize doit inclure ou non les propriétés relative au temps (createdAt, updatedAt)
        timestamps: false,
    }
});

module.exports = sequelize;