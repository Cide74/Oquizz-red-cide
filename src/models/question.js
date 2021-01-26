const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

class Question extends Sequelize.Model {};

Question.init({
    description: Sequelize.STRING,
    anecdote: Sequelize.STRING,
    wiki: Sequelize.STRING,
}, {
    sequelize,
    tableName: 'question',
});

module.exports = Question;