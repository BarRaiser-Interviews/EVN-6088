var express = require('express');
var router = express.Router();
let db =  require('../db/mongodb')

/* GET users listing. */
router.post('/', async function(req, res, next) {
  let quizName = req.body.quizname;
   let questions = req.body.questions;

  if(!quizName) {
      res.status(404).send({msg: "inavlid request"});
  }

  let Quiz = db.getQuizModel();

  try {
      let quiz = await Quiz.findOne({quizName: quizName });
      if(quiz) {
          res.status(409).send({msg : "quiz already exist by same name"});
          return;
      }

      quiz = new Quiz();
      quiz.quizName = quizName;
      if(questions) quiz.questions = questions;

      quiz.save()
      .then(item => {
          res.status(201).send({"quizname" : item.quizName})
      }).catch (err => {
          console.log(err)
          res.status(400).send({msg: "something went wrong. please try again"})
      })
  } catch(err) {
    console.log(err)
    res.status(400).send({msg: "something went wrong. please try again"})
  }
});

router.get('/', async function (req, res, next) {
    let offset = 0;
    let count = 10;


    offset = req.query.offset;
    count = req.query.count;

    console.log(offset)
    console.log(count)


    let Quiz = db.getQuizModel();
    let mongo = db.getDb();


    let result =  await Quiz.find();//.skip(offset).limit(count);

    result = result.splice(offset, count);
    // console.log(result)
    // result = result.splice(2, result.length);
    console.log(result)
    res.send(result);
});

module.exports = router;
