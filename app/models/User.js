const CoreModel = require('./CoreModel');

class User extends CoreModel {

    // Proprietes
    _firstname;
    _lastname;
    _email;
    _password;
    
    // Constructeur
    constructor(id, firstname, lastname, email, password) {

        super(id);
        this.setFirstname(firstname);
        this.setLastname(lastname);
        this.setEmail(email);
        this.setPassword(password);

    }

    // Getters
    getFirstname() {
        return this._firstname;
    }

    getName() {
        return this._name;
    }

    getEmail() {
        return this._email;
    }

    getPassword() {
        return this._password;
    }


    // Setters
    setFirstname(newFirstname) {
        if(typeof newFirstname !== "string") {
            console.log("Le nom doit etre de type string !");
        } else this._firstname = newFirstname;
    }

    setLastname(newLastname) {
        if(typeof newLastname !== "string") {
            console.log("Le nom doit etre de type string !");
        } else this._lastname = newLastname;
    }
    
    setEmail(newEmail) {
        if(typeof newEmail !== "string") {
            console.log("Le lien Email doit etre de type string !")
        } else this._email = newEmail;
    }

    setPassword(newPassword) {
        if(typeof newPassword !== "string") {
            console.log("Le lien Password doit etre de type string !")
        } else this._password = newPassword;
    }


    // Methodes maisons
    toString() {
        console.log(`
            Mon id est ${this.id} 
            je me nomme  ${this._firstname} 
            mon nom est ${this._lastname}
            mon email est ${this._email}
            mon password est : ${this._password}
            `);
    }

}

module.exports = User;