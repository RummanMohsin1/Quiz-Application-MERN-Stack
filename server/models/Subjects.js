const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const categorySchema = mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subjects",
  },
  name: {
    type: String,
    required: true,
  },
});
const testSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  questions: [
    {
      type: Object,
      contains: {
        answers: { type: Array },
        correctAnswer: String,
        questionName: String,
      },
    },
  ],
});

const subModel = mongoose.model("subjects", subjectSchema, "subjects");
const catModel = mongoose.model("categories", categorySchema, "categories");
const testModel = mongoose.model("tests", testSchema, "tests");

module.exports = {
  subModel,
  catModel,
  testModel,
};
