-- En SQL on va respecter les conventions suivantes : snake case, minuscule, singulier

-- début de la transaction qui permet d'annuler le code executé en cas d'erreur au lieu que ça passe à la suite sans arrêter l'execution du fichier
BEGIN;

-- Supprime les tables si elles existent déjà, comme ça on est sûr de partir sur de bonnes bases
DROP TABLE IF EXISTS "user", "quiz", "tag", "question", "answer", "level", "quiz_has_tag";

CREATE TABLE IF NOT EXISTS "user"(
    "id" SERIAL PRIMARY KEY,
    "login" TEXT UNIQUE,
    "password" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "quiz"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    -- On déclare une clef étrangère en utilisant le mot clef REFERENCES suivi du nom de la table et le nom du champs clef primaire vers lequel elle fait référence
    "user_id" INT NOT NULL REFERENCES "user"("id")
);

CREATE TABLE IF NOT EXISTS "tag"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "quiz_has_tag"(
    "quiz_id" INT NOT NULL REFERENCES "quiz"("id"),
    "tag_id" INT NOT NULL REFERENCES "tag"("id"),
    -- on indique que les deux champs de la table de liaison sont considérés comme étant une seule clef primaire. C'est important car toutes les tables doivent en posséder une.
    PRIMARY KEY("quiz_id", "tag_id")
);

CREATE TABLE IF NOT EXISTS "level"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "question"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "context" TEXT,
    "quiz_id" INT NOT NULL REFERENCES "quiz"("id"),
    "level_id" INT NOT NULL REFERENCES "level"("id"),
    -- on ne peut pas utiliser REFERENCES ici car la table answer n'est pas encore créée. Il faudra donc la renseigner à posteriori.
    "answer_id" INT NOT NULL
);

CREATE TABLE IF NOT EXISTS "answer"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "question_id" INT NOT NULL REFERENCES "question"("id")
);

-- On renseigne la clef etrangère dans la table question qui pointe vers la bonne réponse
ALTER TABLE "question" ADD FOREIGN KEY ("answer_id") REFERENCES "answer"("id");

-- fin de la transaction
COMMIT;







