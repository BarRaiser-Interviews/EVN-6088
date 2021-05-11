var mongoose = require('mongoose')

mongoose.promise = global.promise;

let Quiz;
let Question;
let _db;

async function initDb() {
    if(_db) {
        console.log("db is already intialized");
        return;
    }

    const uri = "mongodb://localhost:27017/"

    mongoose.connect(uri, {});
    _db = mongoose;
}

function getDb() {
    return _db;
}

let questionModel = {
    question:'',
    options: [],
    answer: []
}

function getQuizModel() {
    if(Quiz) return Quiz;

    let quizSchema = new mongoose.Schema({
        quizName: {type: 'string' , unique: true},
        questions: [String]
    }, {versioning: false});

    Quiz = mongoose.model("Quiz", quizSchema);
    return Quiz;
}

function getQuestionModel() {
    if(Question) return Question;

    let questionSchema = new mongoose.Schema({
        name: {type: 'string' , unique: true},
        options: [String],
        answers: [String]
    }, {versioning: false});

    Question = mongoose.model("Question", questionSchema);
    return Question;
}

module.exports = {
    getDb,
    initDb,
    getQuizModel,
    getQuestionModel
}