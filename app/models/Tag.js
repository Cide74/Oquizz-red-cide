const CoreModel = require('./CoreModel');

class Tag extends CoreModel {

    // propriétes
    _name;

    // Constructeur
    constructor(id, name) {
        super(id);
        this._name = name;
    }

    //Getters
    getId(){
        return this._id;
    }

    getName(){
        return this._name;
    }

    //Setters
    setId(newId) {
        if(typeof newId !== "number") {
            console.log("L'id doit etre un nombre !")
        } else {
            this._id = newId;
        }
    }
 
    setName(newName) {
        if(typeof newName !== "string") {
            console.log("Le Name doit être une chaîne de caractère");
            
        } else {
            this._name = newName;
        }
    }

    // Methodes maisons
    toString(){
        console.log(`l'id est ${this._id} et le nom est ${this._name}`);
        
    }

}   

module.exports = Tag;
