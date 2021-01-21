class CoreModel {
    
    id;

    constructor(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setId(newId) {
        if(typeof newId !== "number") {
            throw Error("L'id doit etre un nombre !")
        } else {
            this.id = newId; 
        }
    }
}

module.exports = CoreModel;