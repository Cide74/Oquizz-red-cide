const CoreModel = require('./coreModel');

class Quiz extends CoreModel {
    _title;
    _description;
    _user_id;

    static table = "quiz";

    constructor(obj) {
        super(obj);
        this.setTitle(obj.title);
        this.setDescription(obj.description);
        this.setUserID(obj.user_id);
    }

    getTitle() {
        return this._title;
    }

    getDescription() {
        return this._description;
    }

    getUserID() {
        return this._user_id;
    }

    setTitle(value) {
        if (typeof value !== 'string') {
            throw Error('Quiz._title must be a string.');
        }

        this._title = value;
    }

    setDescription(value) {
        if (typeof value !== 'string') {
            throw Error('Quiz._description must be a string.');
        }
        
        this._description = value;
    }

    setUserID(value) {
        if (isNaN(parseInt(value, 10))) {
            throw Error('Quiz._user_id must be an integer.');
        }

        this._user_id = parseInt(value, 10);
    }
}

module.exports = Quiz;