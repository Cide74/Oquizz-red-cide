// CoreModel est une class qui permet de gérer les fonctionnalités de base
// de toutes les entités de notre application (leur id)

class CoreModel {

    // Proprietes
    _id;

    static table = null ;

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
      
    static findAll(callback) {
        database.query(`SELECT * FROM "${this.table}"`, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                // On peux utiliser this pour cibler la class dans laquel on se trouve 
                const users = results.rows.map(obj => new this(obj));

                callback(null, users);
            }
        });
    }

    static findById(id, callback) {
        database.query(`SELECT * FROM "${this.table}" WHERE id = $1`, [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else if (results.rowCount) {
                callback(null, new this(results.rows[0]))
            } else {
                callback(null, null);
            }
        });
    }

    // insert parametrable en fonction du tableau
    insert(callback) {
        const valuesName = Object.keys(this)
            // slice(1) pour supprimer le '_id' du tableau
            .slice(1)
            // on applique sur chaque élément du tableau une fonction qui supprime l'underscore au début de la prop
            .map(str => str.substring(1));

        // pour avoir les valeurs a inserer
        const sqlQueryFields = valuesName.map((str) => '"' + str + '"').join(', ');
        // pour avoir les valeurs a ajouter
        const sqlQueryValues = valuesName.map((_, index) => '$' + (index + 1)).join(', ';
        // pour avoir les valeurs a modifier
        const values = valuesName.map(valueName => this[valueName])


    // pour accedé a l'instence mere on ajoute .constructor entre this.table
        const query = {
            text: `
                INSERT INTO "${this.constructor.table}"
                (${sqlQueryFields})
                VALUES (${sqlQueryValues})
                RETURNING "id"
            `,
            values,
        };


        /*
        const query = {
            text: `
                INSERT INTO "user"
                (${valuesName.map(str => '"' + str + '"').join(', ')})
                VALUES (${valuesName.map((_, index) => '$' + (index + 1)).join(', ')})
                RETURNING "id"
            `,
            values: [
                this.getFirstname(),
                this.getLastname(), 
                this.getEmail(),
                this.getPassword()
            ],
        };*/


        database.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else if (results.rowCount) {
                this.setId(results.rows[0].id);
                callback(null, this);
            } else {
                callback('Insert did not return any id.', this);
            }
        });
    };
    }   

    update(callback) {
        const valuesName = Object.keys(this)
            .slice(1)
            .map(str => str.substring(1));

        const sqlQueryValues = valuesName.map((_, index) => '$' + (index + 1)).join(', ');

        const sqlQueryValuesList = valuesName.map((valueName, index) => {
            return `"${valueName}" = $${index + 1}${valuesName.length !== index + 1 ? ',' : ''}${os.EOL}`
        }).join('');
        const sqlQueryIdValue = valuesName.length + 1;

        const values = valuesName.map(valueName => this['_' + valueName]);
        values.push(this._id);

        const query = {
            text: `
                UPDATE "${this.constructor.table}" SET
                ${sqlQueryValuesList}
                WHERE "id" = $${sqlQueryIdValue}
            `,
            values,
        };

        database.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else if (results.rowCount) {
                callback(null, this);
            } else {
                callback('Update did not target any rows.', this);
            }
        });
    }

    delete(callback) {
        const query = {
            text: `DELETE FROM "${this.constructor.table}" WHERE id = $1`,
            values: [this.getId()],
        };

        database.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else if (results.rowCount) {
                callback(null, this);
            } else {
                callback('Delete did not target any rows.', this);
            }
        });
    }





}

module.exports = CoreModel;

//test
//new CoreModel({ id: "123" });
//new CoreModel({ id: 123 });

// const cm = new CoreModel({ id: "273839272833" });

//console.log(cm);

