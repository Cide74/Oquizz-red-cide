const CoreModel = require('./CoreModel');

class Question extends CoreModel {
    _name;
    _context;
    _quiz_id;
    _level_id;
    _answer_id;

    constructor(id, name, context, quiz_id, level_id, answer_id) {
        super(id);
        this.setName(name);
        this.setContext(context);
        this.setQuizId(quiz_id);
        this.setLevelId(level_id);
        this.setAnswerId(answer_id);
    };

    toString(){
        console.log(`La question a un id de ${this._id}, elle a comme nom ${this._name}, son contexte est ${this._context}. Elle appartient au quiz ayant pour id ${this._quiz_id}, a un niveau ayant pour id ${this._level_id}, et une réponse qui a un id de ${this._answer_id}`);
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getContexte(){
        return this._contexte;
    }

    getQuizId(){
        return this._quiz_id;
    }

    getLevelId(){
        return this._level_id;
    }

    getAnswerId(){
        return this._answer_id;
    }

    setId(newId) {
        if(typeof(newId) !== "number") console.log('id non valide');
        else this._id = newId
    }

    setName(newName) {
        if(typeof(newName) !== "string") console.log('nom non valide');
        else this._name = newName
    }

    setContext(newContext){
        if(typeof(newContext) !== "string") console.log('contexte non valide');
        else this._context = newContext
    }

    setQuizId(newId){
        if(typeof(newId) !== "number") console.log('L\'id du quizz est non valide');
        else this._quiz_id = newId
    }

    setLevelId(newId){
        if(typeof(newId) !== "number") console.log('L\'id du niveau est non valide');
        else this._level_id = newId
    }

    setAnswerId(newId){
        if(typeof(newId) !== "number") console.log('L\'id de la réponse est non valide');
        else this._answer_id = newId
    }
    
}


module.exports = Question;