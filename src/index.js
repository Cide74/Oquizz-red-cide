const Level = require('./models/level');

Level.getAllLevels((error, result) => {
    console.log(error, result);
});