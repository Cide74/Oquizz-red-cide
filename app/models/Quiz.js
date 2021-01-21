const CoreModel = require('./CoreModel');

class Quiz extends CoreModel {
    
    _name;
    _id_user;

    constructor(id, name, id_user) {
        super(id);
        this._name = name
        this._id_user = id_user
    }

    getName() {
        return this._name;
    }
    
    getId_user() {
        return this._id_user;
    }

    setName(newName) {
        if(typeof newName !== "string") {
            console.log("Le nom doit etre de type string !");
        } else this._name = newName;
    }

    setId_user(newId_user) {
        if(typeof newId_user !== "string") {
            console.log("Le nom doit etre de type string !");
        } else this._id_user = newId_user;
    }
    
    toString() {
        console.log(`
            Le quiz dont l'id est ${this.id}
            s'intitule ${this._name} 
            et l'id de son utilisateur est ${this._id_user}`
            );        
    }
}

module.exports = Quiz;