const express = require("express");
const { testModel } = require("../models/Subjects");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

//Creating a new Test
router.post("/createTest", checkAuth, (req, res) => {
  let quiz = new testModel({
    ...req.body.quiz,
    questions: req.body.quiz.questions.map((ques) => {
      return {
        ...ques,
        answers: ques.answers.map((ans) => {
          return {
            name: ans,
            selected: false,
          };
        }),
      };
    }),
  });
  quiz.save().then((result) => {
    res.status(200).json({ success: true });
  });
});

router.get("/my-quizzes/:id", checkAuth, (req, res) => {
  testModel.find(req.query._id).then((result) => {
    res.status(200).json(result);
  });
});

router.get("/all-quizzes", checkAuth, (req, res) => {
  testModel.find().then((result) => {
    res.status(200).json(result);
  });
});

router.get("/get-quiz/:id", checkAuth, (req, res) => {
  testModel
    .findOne({ _id: req.params.id })
    .then((quiz) => {
      res.status(200).json({ quiz });
    })
    .catch((er) => {
      res.status(500).send(er);
    });
});

module.exports = router;
