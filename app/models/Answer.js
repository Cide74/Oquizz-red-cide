const CoreModel = require('./CoreModel');

// Au sein de la class Answer, on peux considérer que super prend cette valeur:
// const super = CoreModel;

class Answer extends CoreModel {

    // Proprietes
    _description;
    _question_id;

    static table = "level";

    // Constructeur
    constructor(obj) {
        super(obj);
        this.setDescription(_description);
        this.setQuestionId(question_id);
    };

    // les Getter
    getDescription() {
        return this._description;
    }

    getQuestionID() {
        return this._question_id;
    }

    // les Setter
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

        this._question_id = value;
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

// const a = new Answer({
//     id: "1383",
//     description: "blablabla",
//     question_id: "84930",
// });

// console.log(a);