const bcrypt = require('bcrypt');
const { user } = require('../database');
const database = require('../database');
const CoreModel = require('./coreModel');

const salt = bcrypt.genSaltSync(10);

class User extends CoreModel {
    _firstname;
    _lastname;
    _email;
    _password;

    static table = 'user';

    constructor(obj) {
        super(obj);
        this.setFirstname(obj.firstname);
        this.setLastname(obj.lastname);
        this.setEmail(obj.email);
        this.setPassword(obj.password);
    }

    getFirstname() {
        return this._firstname;
    }

    getLastname() {
        return this._lastname;
    }

    getEmail() {
        return this._email;
    }

    getPassword() {
        return this._password;
    }

    setFirstname(value) {
        if (typeof value !== 'string') {
            throw Error('User._firstname must be a string.');
        }

        this._firstname = value;
    }

    setLastname(value) {
        if (typeof value !== 'string') {
            throw Error('User._lastname must be a string.');
        }

        this._lastname = value;
    }

    setEmail(value) {
        if (typeof value !== 'string') {
            throw Error('User._email must be a string.');
        }

        this._email = value;
    }

    setPassword(value) {
        if (typeof value !== 'string') {
            throw Error('User._password must be a string.');
        }

        this._password = bcrypt.hashSync(value, salt);
    }
}

//User.findBy({ firstname: 'Chuck', lastname: 'Norris' }, (err, results) => {
//    console.log(err, results);
//});
//
//User.findBy({}, (err, results) => {
//    console.log(err, results);
//});
// pour tester node src/models/user.js


const hp = new User({
    firstname: 'Harry',
    lastname: 'Potter',
    email: 'harry@hogwarts.io',
    password: 'hedwige',
});

hp.save((err, results) => {
    console.log('after first save', err, results);

    hp.setPassword('serpentard au top');

    hp.save((err, results) => {
        console.log('after second save', err, results);
    });
});


module.exports = User;