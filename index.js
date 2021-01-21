const Answer = require('./app/models/Answer')
const Level = require('./app/models/Level')
const Question = require('./app/models/Question')
const User = require('./app/models/User')
const Tag = require('./app/models/Tag')
const Quiz = require('./app/models/Quiz')



const answerTest = new Answer(1,"name", 25)
const questionPokemon = new Question(1, 'Jojo', 'blabla', 5, 6, 7)
const level1 = new Level(1, "tres facile");
const userTest = new User(1, 'prenom', 'nom de famille', 'email', 'mot de passe')
const newTag = new Tag(1, "astrologie");
const quizzTest = new Quiz(5, 'bla bla', 'blo blo')


// userTest.toString()
// questionPokemon.toString()
// level1.toString()
// newTag.toString()
// answerTest.toString()
quizzTest.toString()