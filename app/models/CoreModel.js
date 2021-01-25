// CoreModel est une class qui permet de gérer les fonctionnalités de base
// de toutes les entités de notre application (leur id)

class CoreModel {

    // Proprietes
    _id;

    // Constructeur
    constructor(obj) {

        // avec le controle par .setId
        //this.setId ( obj.id );
        // On ne fais pas .setId ici car on veut laisser la possibilité
        // de pouvoir créer une instance SANS id
        this._id = obj.id;
    }

    // les Getter
    getId() {
        return this._id;
    }

    // les Setter
    /* correction
    setId(newId) {
        if(typeof newId !== "number") {
            throw Error("L'id doit etre un nombre !")
        } else {
            this.id = newId; 
        }
    }*/

    // avec double controle 
    setId(value) {
        // On verifie que la valeur est bien un nombre
        if (isNaN(parseInt(value, 10))) {
            throw Error('CoreModel._id must be an integer.');
        }

        this._id = value;
    }

    /*ou
    setId(value) {
        if (isNaN(+value)) {
            throw Error('CoreModel._id must be an integer.');
        }

        this._id = value;
    }*/

    /* bonus
    set id(value) {
      if(isNaN(parseInt(value, 10))) {
        throw Error("CoreModel.id must be a integer !");
        // on "lève" une erreur => ça arrête tout !
      }
      this.id = value;
    }*/
      
}

module.exports = CoreModel;

//test
//new CoreModel({ id: "123" });
//new CoreModel({ id: 123 });

// const cm = new CoreModel({ id: "273839272833" });

console.log(cm);

