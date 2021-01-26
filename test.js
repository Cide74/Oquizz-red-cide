// const User = require('./src/models/user');
// const Level = require('./src/models/level');

const { 
    Answer, 
    Level, 
    Question, 
    Quiz, 
    Tag, 
    User 
} = require('./src/models');

/* test


User.findAll()
    .then((users) => {
        console.log(users);
    });

   // pour findId
User.findByPk(1).then((user) => console.log(user));
*/


Level.findByPk(1).then((level) => console.log(level));

/*
User.findAll({
    // inclue tous les quizz si des user en on creer
    include: ['quizzes']
}).then((users) => console.log(users));


User.findAll({
    include: ['quizzes']
}).then((users) => {
    console.log(users[1].dataValues.quizzes);
});



 Quiz.findByPk(1, {
     include: ['questions'],
 }).then(quiz => console.log(quiz.dataValues));

 Tag.findByPk(1).then(tag => console.log(tag));

 /*
Tag.findByPk(1, {
    include: ['quizzes'],
}).then(tag => console.log(tag));


Tag.findByPk(1, {
    include: [{
        association: 'quizzes',
        include: ['author']
    }],
}).then(tag => console.log(tag));



Tag.findByPk(1, {
    // trouve des donnée qui inclus
    include: [{
        // en association
        association: 'quizzes',
        include: ['author']
    }],
}).then(tag => {
    let msg = '';

    // on .forEach sur la relation de notre tag: 'quizzes'
    tag.quizzes.forEach(quiz => {
        // on accède à la relation de quiz: 'author'
        // msg += `${quiz.title}, écrit par ${quiz.author.firstname}\n`
        //msg += `${quiz.title}, écrit par ${quiz.author.firstname + ' ' + quiz.author.lastname}\n`
        // test avec méthode dans user
        msg += `${quiz.title}, écrit par ${quiz.author.getFullname()}\n`
    });

    console.log(msg);
});
*/