const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

class User extends Sequelize.Model {

    // on peut créer des méthode en plus
    getFullname() {
        return this.firstname + ' ' + this.lastname;
    }
};

User.init({
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    lastname: Sequelize.STRING,
    firstname: Sequelize.STRING,
}, {
    sequelize,
    tableName: 'user',
});

module.exports = User;