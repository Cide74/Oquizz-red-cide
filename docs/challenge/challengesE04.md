Les méthodes Active Record sont maintenant factorisé directement dans CoreModel !!

Commencer par vérifier que tout fonctionne en écrivant quelques tests dans test.js, par exemple :

Trouver tous les User.
Trouver la question dont l'id est 3.
Créer un Level avec le nom "très difficile" et l'insérer en BDD.
...
Ensuite, rajouter 2 méthodes dans CoreModel :

findBy(params, callback) qui trouve les modèles correspondants à tous les paramètres passées dans le premier argument.
save(callback) : cette méthode appelle soit insert soit update, selon que l'instance existe déjà dans la BDD ou pas.