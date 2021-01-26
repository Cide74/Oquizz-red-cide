const CoreModel = require('./coreModel');

class Tag extends CoreModel {
    _name;

    static table = "tag";

    constructor(obj) {
        super(obj);
        this.setName(obj.name);
    }

    getName() {
        return this._name;
    }

    setName(value) {
        if (typeof value !== 'string') {
            throw Error('Tag._name must be a string.');
        }

        this._name = value;
    }
}

module.exports = Tag;