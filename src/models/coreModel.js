// CoreModel est une class qui permet de gérer les fonctionnalités de base
// de toutes les entités de notre application (leur id)
const os = require('os');
const database = require("../database");

class CoreModel {
    _id;

    static table = null;

    constructor(obj) {
        // On ne fais pas .setId ici car on veut laisser la possibilité
        // de pouvoir créer une instance SANS id
        this._id = obj.id;
    }

    getId() {
        return this._id;
    }

    setId(value) {
        // On verifie que la valeur est bien un nombre
        if (isNaN(parseInt(value, 10))) {
            throw Error('CoreModel._id must be an integer.');
        }

        this._id = parseInt(value, 10);
    }

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

    static findBy(params, callback) {
        // on creer un tableau vide. 
        const values = [];

        // On veut générer les conditions pour notre requete SQL
        // (on transforme l'objet params en tableau de keys pour pouvoir le parcourir avec .map)
        const paramsKeys = Object.keys(params);

        //console.log(paramsKeys);

        const sqlQueryConditions = paramsKeys.map((paramKey, index) => {
            // On profite de la boucle du .map pour générer un deuxième tableau qui contient les valeurs associé au placeholders de la req sql
            values.push(params[paramKey]);
            return `"${paramKey}" = $${index + 1}`;
        });
        // on ajoute $1 $2 a chaque parametres
        //console.log(sqlQueryConditions, values);

        // on met where si besoin et and et les ':' = sinon
        // Ternaire sur paramsKeys pour savoir si on doit compléter la requete SQL pour inclure des filtres
        // ou si on ne doit rien mettre afin d'avoir un comportement similaire à .findAll
        const sqlQuery = paramsKeys.length 
            ? `WHERE ${sqlQueryConditions.join(' AND ')}` 
            : '';

        const query = {
            text: `SELECT * FROM "${this.table}" ${sqlQuery}`,
            values,
        };

        //console.log(query);

        database.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                const objs = results.rows.map(obj => new this(obj));
                callback(null, objs);
            }
        });
    }


    insert(callback) {
        const valuesName = Object.keys(this)
            // slice(1) pour supprimer le '_id' du tableau
            .slice(1)
            // on applique sur chaque élément du tableau une fonction qui supprime l'underscore au début de la prop
            .map(str => str.substring(1));

        const sqlQueryFields = valuesName.map((str) => '"' + str + '"').join(', ');
        const sqlQueryValues = valuesName.map((_, index) => '$' + (index + 1)).join(', ');

        const values = valuesName.map(valueName => this['_' + valueName]);

        const query = {
            text: `
                INSERT INTO "${this.constructor.table}"
                (${sqlQueryFields})
                VALUES (${sqlQueryValues})
                RETURNING "id"
            `,
            values,
        };

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
    }

    update(callback) {
        const valuesName = Object.keys(this)
            .slice(1)
            .map(str => str.substring(1));

        
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


    save(callback) {
        // Version minimal:
        // this[this.getId() ? 'update' : 'insert'](callback);
        if (this.getId()) {
            console.log('update');
            this.update(callback);
        } else {
            console.log('insert');
            this.insert(callback);
        }
    }



}

module.exports = CoreModel;
