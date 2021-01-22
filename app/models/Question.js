const CoreModel = require('./coreModel');

class Question extends CoreModel {
    _description;
    _anecdote;
    _wiki;
    _answer_id;
    _quiz_id;
    _level_id;

    constructor(obj) {
        super(obj);
        this.setDescription(obj.description);
        this.setAnecdote(obj.anecdote);
        this.setWiki(obj.wiki);
        this.setAnswerID(obj.answer_id);
        this.setQuizID(obj.quiz_id);
        this.setLevelID(obj.level_id);
    }

    getDescription() {
        return this._description;
    }

    getAnswerID() {
        return this._answer_id;
    }

    getQuizID() {
        return this._quiz_id;
    }

    getLevelID() {
        return this._level_id;
    }

    getAnecdote() {
        return this._anecdote;
    }

    getWiki() {
        return this._wiki;
    }

    setDescription(value) {
        if (typeof value !== 'string') {
            throw Error('Question._description must be a string.');
        }

        this._description = value;
    }

    setAnecdote(value) {
        if (typeof value !== 'string') {
            throw Error('Question._anecdote must be a string.');
        }

        this._anecdote = value;
    }

    setWiki(value) {
        if (typeof value !== 'string') {
            throw Error('Question._wiki must be a string.');
        }

        this._wiki = value;
    }

    setAnswerID(value) {
        if (isNaN(parseInt(value, 10))) {
            throw Error('Question._answer_id must be an integer.');
        }

        this._answer_id = parseInt(value, 10);
    }

    setQuizID(value) {
        if (isNaN(parseInt(value, 10))) {
            throw Error('Question._quiz_id must be an integer.');
        }

        this._quiz_id = parseInt(value, 10);
    }

    setLevelID(value) {
        if (isNaN(parseInt(value, 10))) {
            throw Error('Question._level_id must be an integer.');
        }

        this._level_id = parseInt(value, 10);
    }
}

module.exports = Question;
