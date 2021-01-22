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


    
    save() {
        // save l'instance dans la bdd
        database.query('JE VEUX SAVE MON OBJET')
    }



}


module.exports = Level;