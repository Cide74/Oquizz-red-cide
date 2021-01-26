const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

class Answer extends Sequelize.Model {};

// Premier parametre: la liste des valeurs dans le model (sans mettre les ids de relation)
Answer.init({
    description: Sequelize.STRING,
}, {
    sequelize,
    tableName: 'answer',
});

module.exports = Answer;