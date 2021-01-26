const CoreModel = require('./coreModel');
const database = require('../database'); 

class Level extends CoreModel {
    _name;

    static table = "level";

    constructor(obj) {
        super(obj);
        this.setName(obj.name);
    }

    getName() {
        return this._name;
    }

    setName(value) {
        if (typeof value !== 'string') {
            throw Error('Level._name must be a string.');
        }

        this._name = value;
    }
}

module.exports = Level;