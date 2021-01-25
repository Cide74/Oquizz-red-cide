const CoreModel = require('./coreModel');
const database = require('../database'); 

class Level extends CoreModel {
    _name;

    constructor(obj) {
        super(obj);
        this.setName(obj.name);
    }

    getName() {
        return this._name;
    }

    setName(value) {
        if (typeof value !== 'string') {
            throw Error('Level._name must be a string.');
        }

        this._name = value;
    }

    static getAllLevels(callback) {
        // On envoie une requete async à la db
        database.query('SELECT * FROM level', (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                const levels = [];

                // result.rows est un array des data de la db donc on peux forEach pour tout convertir en levelData => instance Level
                // exemple de result.rows:
                // rows: [
                //     { id, name },
                //     { id, name },
                //     { id, name },
                //     { id, name }
                // ]
                result.rows.forEach(levelData => {
                    // On crée une instance de notre Model tout propre
                    const level = new Level(levelData);
                    levels.push(level);
                });

                callback(null, levels);
            }
        });
    }

    static getOneLevel(id, callback) {
        database.query('SELECT * FROM level WHERE id = $1', [id], (error, result) => {
            if (error) {
                callback(error, null);
            // On test si il y a une liste de result mais vide, si oui => pas d'erreur mais pas de resultat
            } else if (result.rows.length === 0) {
                callback(null, null);
            // On arrive au else: aucune erreur et on a bien des résultats
            } else {
                callback(null, new Level(result.rows[0]));
            }
        });
 
    }


    /*
    save() {
        // save l'instance dans la bdd
        database.query('JE VEUX SAVE MON OBJET')
    }
    */

    // on insert une donnée ( + 1 nivau supplementaire)
    insert(callback) {
    const query = {
        text: `
            INSERT INTO "level"
            ("name")
            VALUES ($1)
            RETURNING "id"
        `,
        values: [this._name],
    };

    /* avec 2 if
    database.query(query, (err, result) => {
        if (err) {
            return callback(err, null);
        }

        if (result.rowCount) {
            this.id = result.rows[0].id;

            callback(null, this)
        } else {
            callback('Insert did not return any id.', this);
        }
    });*/


    // avec else if  
    database.query(query, (err, result) => {
        // S'il y a une erreur
        if (err) {
            callback(err, null);
        } else if (result.rowCount) {
            // control
            //console.log(result.rows[0]);
            this.setId(result.rows[0].id);
            callback(null, this);
        } else {
            // Il n'y a pas eu d'erreur mais quand même quelque chose bizarre
            callback('Insert did not return any id.', this);
        }
    });
    }

    // pour la mise a jour d'une valeur
    update(callback) {
        const query = {
            text: `
                UPDATE "level" SET
                "name" = $1
                WHERE "id" = $2
            `,
            values: [this.getName(), this.getId()]
        };

        database.query(query, (err, result) => {
            if (err) {
                callback(err, null);
            // rowCount est la longueur du tableau rows, quelque chose comme ça:
            // result = {
            //     rows: [data1, data2],
            //     rowCount: result.rows.length,
            // }
            } else if (result.rowCount) {
                callback(null, this);
            } else {
                callback('Update did not target any rows.', this);
            }
        });
    }

    // supprimer une donnée
    delete(callback) {
        const query = {
            text: `
                DELETE FROM "level"
                WHERE id = $1`,
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
    }




}

module.exports = Level;

/*
Test insert

const level = new Level({ name: 'Super Impossible' });
level.insert((err, result) => {
    console.log(err, result);
});


test update

montre le niveau avec id 7
Level.getOneLevel(7, (err, result) => {
    console.log(err, result);

    if (err) {
        throw Error(err);
    }

    level.setName('Extra Impossible');
    console.log('UPDATE');
    level.update((err, result) => {
        console.log(err, result);
    });
});

test
Level.getOneLevel(7, (err, level) => {
    if (err) {
        throw Error(err);
    }

    console.log(err, level);

    // Le setName change le .name seulement localement dans l'objet javascript
    level.setName('Extra Impossible');
    // Le .update permet de propager les changements dans la base de donnée
    level.update((err, result) => {
        console.log(err, result);
    });
});

const level = new Level({ name: 'Super facile'});

level.insert((err, result) => {
    console.log(err, result);
});


pour supprimer id 8

Level.getOneLevel(8, (err, result) => {
    if (err) {
        throw Error(err);
    }
    const level = result;

    level.delete((err2, result2) => {
        console.log(err2, result2);
    });
})

*/ 









