const CoreModel = require('./CoreModel');

class Answer extends CoreModel {

    // Proprietes
    _name;
    _question_id;

    // Constructeur
    constructor(id, name, question_id) {
        super(id);
        this.setName(name)
        this.setQuestionId(question_id)
    };

    // les Getter
    getName() {
        return this._name;
    }

    getQuestionId(){
        return this._question_id
    }

    // les Setter
    setName(newName) {
        if(typeof(newName) !== "string") console.log('nom non valide');
        else this._name = newName
    }

    setQuestionId(newId) {
        if(typeof(newId) !== "number") console.log('id non valide');
        else this._question_id = newId
    }

    // Methodes maisons
    toString(){
        console.log(`
        La réponse a un id de ${this._id}, 
        elle a comme nom ${this._name} 
        et elle répond à la question dont l'id est ${this._question_id}
        `);
    }
}

module.exports = Answer;