const bcrypt = require('bcrypt');
const database = require('../database');
const CoreModel = require('./coreModel');

const salt = bcrypt.genSaltSync(10);

class User extends CoreModel {
    _firstname;
    _lastname;
    _email;
    _password;

    static table = 'user' ;

    constructor(obj) {
        super(obj);
        this.setFirstname(obj.firstname);
        this.setLastname(obj.lastname);
        this.setEmail(obj.email);
        this.setPassword(obj.password);
    }

    getFirstname() {
        return this._firstname;
    }

    getLastname() {
        return this._lastname;
    }

    getEmail() {
        return this._email;
    }

    getPassword() {
        return this._password;
    }

    setFirstname(value) {
        if (typeof value !== 'string') {
            throw Error('User._firstname must be a string.');
        }

        this._firstname = value;
    }

    setLastname(value) {
        if (typeof value !== 'string') {
            throw Error('User._lastname must be a string.');
        }

        this._lastname = value;
    }

    setEmail(value) {
        if (typeof value !== 'string') {
            throw Error('User._email must be a string.');
        }

        this._email = value;
    }

    setPassword(value) {
        console.log('setPassword:', value, typeof value);
        if (typeof value !== 'string') {
            throw Error('User._password must be a string.');
        }

        this._password = bcrypt.hashSync(value, salt);
    }


    // ACTIVE RECORDING METHODS

    /* - dans coreModel maintenant
    static getAllUsers(callback) {
        // On met la table user entre guillemet car sinon il tape dans la table user de la db qui est la table par défaut pour stocker les users de la db
        // Et du coup sans guillemet il tape pas dans notre table "user" à nous
        database.query('SELECT * FROM "user"', (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                // On passe de ce code "imperatif":
                // const users = [];

                // for (let obj of results.rows) {
                //     users.push(new User(obj));
                // }
                // A sa version plus "fonctionnel":
                const users = results.rows.map(obj => new User(obj));
                
                callback(null, users);
            }
        });
    }

    static getOneUser(id, callback) {
        database.query('SELECT * FROM "user" WHERE id = $1', [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else if (results.rowCount) {
                callback(null, new User(results.rows[0]))
            } else {
                callback(null, null);
            }
        });
    }

    insert(callback) {
        
        const query = {
            text: `
                INSERT INTO "user"
                ("firstname", "lastname", "email", "password")
                VALUES ($1, $2, $3, $4)
                RETURNING "id"
            `,
            // les valeur a inserées 
            values: [
                this.getFirstname(),
                this.getLastname(), 
                this.getEmail(), 
                this.getPassword()
            ],
        };

        database.query(query, (err, result) => {
          
            if (err) {
                callback(err, null);
            } else if (result.rowCount) {
                this.setId(results.rows[0].id);
                callback(null, this);
            } else {
                callback('Insert did not return any id.', this);
            }
        });
        }

       

    update(callback) {
        const query = {
            text: `
                UPDATE "user" SET
                "firstname" = $1,
                "lastname" = $2,
                "email" = $3,
                "password" = $4
                WHERE "id" = $5
            `,
            values: [
                this.getFirstname(),
                this.getLastname(), 
                this.getEmail(), 
                this.getPassword(),
                this.getId(),
            ],
        };

        database.query(query, (err, result) => {
            if (err) {
                callback(err, null);
            } else if (result.rowCount) {
                callback(null, this);
            } else {
                callback('Update did not target any rows.', this);
            }
        });
    }

    delete(callback) {
        const query = {
            text: `
                DELETE FROM "user"
                WHERE "id" = $1`,
            values: [this.getId()],
        };

        database.query(query, (err, result) => {
            if (err) {
                callback(err, null);
            } else if (result.rowCount) {
                callback(null, this);
            } else {
                callback('Delete did not target any rows.', this);
            }
        });
    }*/


}

module.exports = User;

/*
// test en consol
User.getAllUsers((err, result) => {
    console.log(err, result);
});

User.getOneUser(3, (err, result) => {
    console.log(err, result);
});

// insert
const user = new User({
    firstname: 'Harry',
    lastname: 'Potter',
    email: 'harrypotter@hogwarts.io',
    password: 'hedwige',
});
user.insert((err, result) => {
    console.log(err, result);
});

// update
User.getOneUser(4, (err, hp) => {
    if (err) {
        throw Error(err);
    }

    // On .setPassword le mdp (pour l'encrypté) ca ne change la valeur que dans l'instance, que dans l'objet javascript
    hp.setPassword(hp.getPassword());

    // On .update pour que le changement se fasse aussi dans la db => persistance
    hp.update((err, result) => {
        console.log(err, result);
    });
});

// delete
User.getOneUser(4, (err, hp) => {
    hp.delete((err2, result) => {
        console.log(err2, result);
    });
});



// insert avec factorisation
const user = new User({ 
    firstname: 'foo',
    lastname: 'bar',
    email: 'baz',
    password: 'qux',
});

user.insert();

module.exports = User;
*/