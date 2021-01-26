const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

class Level extends Sequelize.Model {};

// Premier parametre: la liste des valeurs dans le model (sans mettre les ids de relation)
Level.init({
    description: Sequelize.STRING,
}, {
    sequelize,
    tableName: 'level',
});

module.exports = Level;