import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import "./Dashboard.css";

export default class MyQuizzes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
    };
  }

  componentDidMount() {
    axios
      .get("/api/tests/my-quizzes/" + localStorage.getItem("_ID"))
      .then((res) => {
        this.setState({
          quizzes: res.data,
        });
      });
  }

  ViewQuiz = (quizId) => {
    this.props.history.push("/view-quiz?id=" + quizId);
  };

  render() {
    return (
      <div className="my-quizzes-wrapper">
        <div>
          <Sidebar />
        </div>
        <div className="body">
          <div className="header-top">My Quizzes</div>
          <div className="quizzes-wrapper">
            {this.state.quizzes.map((quiz, idx) => (
              <div key={idx} className="quiz-card card">
                <img
                  src={
                    quiz.imgUrl ||
                    "https://static.vecteezy.com/system/resources/previews/003/206/208/original/quiz-time-neon-signs-style-text-free-vector.jpg"
                  }
                />
                <div className="quiz-name">{quiz.name}</div>
                {/* <div className="category">{quiz.category}</div> */}
                <div className="questions">
                  {quiz.questions.length} Questions
                </div>
                <div
                  className="take-quiz btn"
                  onClick={() => this.ViewQuiz(quiz._id)}
                >
                  View Quiz
                </div>
                <div className="top-section">
                  <div className="views">
                    {quiz.views}{" "}
                    <img src="https://www.pngkit.com/png/full/525-5251817_security-governance-privacy-eye-icon-font-awesome.png" />{" "}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
