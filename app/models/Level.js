const CoreModel = require('./CoreModel');

class Level extends CoreModel  {

    // Proprietes
    _name;

    // Constructeur
    constructor(obj) {
        super(obj);
        this.setName(_name)
    };

    // les Getter
    getName() {
        return this._name;
    }

    // les Setter
    setName(value) {
        if (typeof value !== 'string') {
            throw Error('Level._name must be a string.');
        }

        this._name = value;
    }

    // Méthode maison
    toString(){
        console.log(`Le niveau a un id de ${this._id}, et sa difficulté est ${this._name}`);
    }
}

module.exports = Level;

/*
 Test
 const l = new Level({
     id: 488339,
     name: "eazy"
 });
 
 console.log(l);
 */