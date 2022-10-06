import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./test.css";
import Dialog from "../Dialog/Dialog";
import axios from "axios";
import Toast from "../Toast/Toast";

export default class CreateQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      cat: [],
      questions: [],
      name: "",
      quizname: "",
      addQuestion: false,
      questionName: "",
      answers: [],
      correctAnswer: "",
      showToast: false,
      selectedCat: [],
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("JWT_PAYLOAD")) {
      this.props.history.push("/");
    }
    this.getList();
  }

  //Handling Category ID
  handleCategoryID = (event) => {
    let catobj = {
      _id: event.target.value,
    };
    this.setState({
      category: catobj,
    });
    console.log(catobj);
  };

  //Add options for question
  addAnswer = () => {
    this.setState({
      answers: this.state.answers.concat(""),
    });
  };

  //Updating answer for question
  updateAnswer = (e, i) => {
    let newArr = Object.assign([], this.state.answers);
    newArr[i] = e.target.value;
    this.setState({
      answers: newArr,
    });
  };

  //Saving question
  saveQuestion = () => {
    let question = {
      answers: this.state.answers,
      correctAnswer: this.state.correctAnswer,
      questionName: this.state.questionName,
    };
    this.setState({
      questions: this.state.questions.concat(question),
      addQuestion: false,
      questionName: "",
      answers: [],
      correctAnswer: "",
    });
  };

  //removing question from database
  removeQuestion = (question) => {
    this.setState({
      questions: this.state.questions.filter(
        (ques) => ques.questionName !== question.questionName
      ),
    });
  };

  //Populating dropdown from database => Categories
  getList = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/categories/getCategories"
      );
      const jsonData = await response.json();
      this.setState({
        cat: jsonData,
      });
      console.log("Xd", this.state.selectedCat);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Saving Quiz to database
  saveQuiz = () => {
    let quiz = {
      name: this.state.name,
      questions: this.state.questions,
      category: this.state.category._id,
    };
    console.log("quiz", quiz);
    axios
      .post("http://localhost:5000/api/tests/createTest", {
        quiz,
      })
      .then((res) => {
        if (res.data.success) {
          this.setState({
            questions: [],
            answers: [],
            categories: [],
            showToast: true,
          });
          setTimeout(() => {
            this.setState({ showToast: false });
          }, 3000);
        }
      })
      .catch((er) => {
        console.error(er);
      });
  };

  render() {
    return (
      <div className="create-quiz-wrapper">
        <Toast model={this.state.showToast} message="Quiz Created" />
        <div>
          <Sidebar />
        </div>
        <div className="main">
          <div className="header">Create Quiz</div>
          <div className="form card">
            <input
              className="input"
              onChange={(e) => this.setState({ name: e.target.value })}
              value={this.state.name}
              placeholder="Quiz Name"
            />
            <br></br>

            <select
              className="input select"
              value={this.state.cat.name}
              key={this.state.cat._id}
              onChange={(e) => this.handleCategoryID(e)}
            >
              <option>------Select Category-------</option>
              {this.state.cat.map((x) => (
                <option value={x._id}>{x.name}</option>
              ))}
            </select>

            {this.state.questions.map((ques, idx) => (
              <div className="question" key={idx}>
                <div>{ques.questionName}</div>
                <div>Correct Answer: {ques.correctAnswer}</div>
                <div>Num of answers: {ques.answers.length}</div>
                <span
                  className="btn delete"
                  onClick={() => this.removeQuestion(ques)}
                >
                  Delete
                </span>
              </div>
            ))}
            <div className="questions">
              <div
                className="add-question"
                onClick={() => this.setState({ addQuestion: true })}
              >
                Add Question
              </div>
            </div>
            <span onClick={() => this.saveQuiz()} className="btn save-quiz">
              Save Quiz
            </span>
            <Dialog model={this.state.addQuestion}>
              <div className="new-question-form">
                <input
                  className="input"
                  placeholder="Question"
                  value={this.state.questionName}
                  onChange={(e) =>
                    this.setState({ questionName: e.target.value })
                  }
                />
                <div>Answers</div>
                {this.state.answers.map((ans, idx) => (
                  <div className="answer-form" key={idx}>
                    <input
                      type="radio"
                      value={this.state.ans}
                      onChange={(e) => this.setState({ correctAnswer: ans })}
                      name="answer"
                    />{" "}
                    <input
                      className="input"
                      type="text"
                      placeholder="Answer"
                      value={this.state.answers[idx]}
                      onChange={(e) => this.updateAnswer(e, idx)}
                    />
                  </div>
                ))}
                <div className="add-answer" onClick={this.addAnswer}>
                  Add Answer
                </div>
                <div className="btn-wrapper">
                  <div
                    className="btn"
                    onClick={() => this.setState({ addQuestion: false })}
                  >
                    Close
                  </div>
                  <div className="btn" onClick={this.saveQuestion}>
                    Save
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}
