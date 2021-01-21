const CoreModel = require('./CoreModel');

class Level extends CoreModel  {
    _name;

    constructor(id, name) {
        super(id);
        this.setName(name)
    };

    toString(){
        console.log(`Le niveau a un id de ${this._id}, et sa difficulté est ${this._name}`);
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    setId(newId) {
        if(typeof(newId) !== "number") console.log('id non valide');
        else this._id = newId
    }

    setName(newName) {
        if(typeof(newName) !== "string") console.log('nom non valide');
        else this._name = newName
    }
}

module.exports = Level;