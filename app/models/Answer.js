const CoreModel = require('./CoreModel');

class Answer extends CoreModel {
    
    _name;
    _question_id;

    constructor(id, name, question_id) {
        super(id);
        this.setName(name)
        this.setQuestionId(question_id)
    };

    toString(){
        console.log(`La réponse a un id de ${this._id}, elle a comme nom ${this._name} et elle répond à la question dont l'id est ${this._question_id}`);
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getQuestionId(){
        return this._question_id
    }

    setId(newId) {
        if(typeof(newId) !== "number") console.log('id non valide');
        else this._id = newId
    }

    setName(newName) {
        if(typeof(newName) !== "string") console.log('nom non valide');
        else this._name = newName
    }

    setQuestionId(newId) {
        if(typeof(newId) !== "number") console.log('id non valide');
        else this._question_id = newId
    }
}

module.exports = Answer;