var express = require('express');
var router = express.Router();
let db = require('../db/mongodb')

/* GET users listing. */
router.post('/', async function (req, res, next) {
    // let quizName = req.body.quizname;
    let name = req.body.name;
    let options = req.body.options;
    let answers = req.body.answers;

    console.log(name)
    console.log(options)
    console.log(answers)
    console.log()

    if ( !answers || !name || !options || options.length < 2 || answers.length < 1) {
        res.status(400).send({ msg: "inavlid request" });
        return
    }

    let Question = db.getQuestionModel();

    try {

    let question = await Question.findOne({name: name });
    if(question) {
          res.status(409).send({msg : "question do exist"});
          return;
    }

    question = new Question();

    question.name = name;
    question.options = options;
    question.answers = answers;

    // await Question.updateOne({name: name}, question, {upsert: true});

    question.save()
      .then(item => {
          res.status(201).send({"id" : item._id})
      }).catch (err => {
          console.log(err)
          res.status(400).send({msg: "something went wrong. please try again"})
      })
    // res.status(201).send({msg: "question added"});

    } catch (err) {
        console.log(err)
        res.status(400).send({ msg: "something went wrong. please try again" })
    }

});



module.exports = router;
