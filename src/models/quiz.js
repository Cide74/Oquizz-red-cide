const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

class Quiz extends Sequelize.Model {};

Quiz.init({
    title: Sequelize.STRING,
    description: Sequelize.STRING,
}, {
    sequelize,
    tableName: 'quiz',
});

module.exports = Quiz;