const CoreModel = require('./coreModel');

// Au sein de la class Answer, on peux considérer que super prend cette valeur:
// const super = CoreModel;

class Answer extends CoreModel {
    _description;
    _question_id;

    static table = "answer";

    constructor(obj) {
        super(obj);
        this.setDescription(obj.description);
        this.setQuestionID(obj.question_id);
    }

    getDescription() {
        return this._description;
    }

    getQuestionID() {
        return this._question_id;
    }

    setDescription(value) {
        if (typeof value !== 'string') {
            throw Error('Answer._description must be a string.');
        }

        this._description = value;
    }

    setQuestionID(value) {
        if (isNaN(parseInt(value, 10))) {
            throw Error('Answer._question_id must be an integer.');
        }

        this._question_id = parseInt(value, 10);
    }
}

module.exports = Answer;