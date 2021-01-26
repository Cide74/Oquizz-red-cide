const Answer = require('./answer');
const Level = require('./level');
const Question = require('./question');
const Quiz = require('./quiz');
const Tag = require('./tag');
const User = require('./user');

// belongTo juste une réponse
// belongs to: appartient à
// hasMany = plusieur réponse


// valide, 11 question, 01 réponse
Question.belongsTo(Answer, {
    foreignKey: 'answer_id',
    as: 'good_answer'
});


// possède, 0N question, 11 réponse
    // 0N question
    Question.hasMany(Answer, {
        foreignKey: 'question_id',
        as: 'answer'
    });
    // relation "bonus" de la relation précédente: c'est la réciproque
    // 11 réponse
    Answer.belongsTo(Question, {
        foreignKey: 'question_id',
        as: 'question',
    });


// défini, 0N niveau, 11 question
    // 0N niveau
    // reciproque
    Level.hasMany(Answer, {
        foreignKey: 'level_id',
        // question avec un s car plusieur questions
        as: 'questions'
    });

    // 11 question
    Question.belongsTo(Question, {
        foreignKey: 'level_id',
        as: 'level',
    });

// compose, 11 question, 0N quizz
    // 11 question
    // réciproque
    Question.belongsTo(Quiz, {
        foreignKey: 'quiz_id',
        as: 'quiz',
    });

    // 0N quizz
    Quiz.hasMany(Question, {
        foreignKey: 'quiz_id',
        as: 'questions',
    });


// crée, 0N utilisateur, 11 quizz
    // 0N user
    // réciproque
    User.hasMany(Quiz, {
        foreignKey: 'user_id',
        as: 'quizzes',
    });

    // 11 quizz
    Quiz.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'author',
    });

// relation entre deux table
// appartient, 0N quizz, 0N category
    Quiz.belongsToMany(Tag, {
        foreignKey: 'quiz_id',
        otherKey: 'tag_id',
        as: 'tags',
        through: 'quiz_has_tag',
    });


    // réciproque
    Tag.belongsToMany(Quiz, {
        foreignKey: 'tag_id',
        otherKey: 'quiz_id',
        through: 'quiz_has_tag',
        as: 'quizzes',
    });

module.exports = {
    Answer,
    Level,
    Question,
    Quiz,
    User,
    Tag
};