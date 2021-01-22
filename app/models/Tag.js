const CoreModel = require('./CoreModel');

class Tag extends CoreModel {

    // propriétes
    _name;

    // Constructeur
    constructor(obj) {
        super(obj);
        this.setName(obj.name);
    }

    //Getters
    getName(){
        return this._name;
    }

    //Setters
    setName(value) {
        if (typeof value !== 'string') {
            throw Error('Tag._name must be a string.');
        }
        this._name = value;
    }

    // Methodes maisons
    //toString(){
    //    console.log(`l'id est ${this._obj} et le nom est ${this._name}`);
    //    
    //}

}   

module.exports = Tag;
