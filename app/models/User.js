const CoreModel = require('./coreModel');

class User extends CoreModel {
    _firstname;
    _lastname;
    _email;
    _password;

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

        this._password = value;
    }
}

module.exports = User;