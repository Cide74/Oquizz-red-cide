class CoreModel {

    // Proprietes
    id;

    // Constructeur
    constructor(id) {
        this.id = id;
    }

    // les Getter
    getId() {
        return this.id;
    }

    // les Setter
    setId(newId) {
        if(typeof newId !== "number") {
            throw Error("L'id doit etre un nombre !")
        } else {
            this.id = newId; 
        }
    }

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