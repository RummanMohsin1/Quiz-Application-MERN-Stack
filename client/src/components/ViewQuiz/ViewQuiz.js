import React from "react";
import "./ViewQuiz.css";
import qs from "qs";
import axios from "axios";

export default class ViewQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      quiz: {},
      isLoading: true,
      isAuthenticated: true,
      inputVal: "",
    };
  }

  checkAuth = () => {
    if (
      this.state.quiz.mustBeSigned &&
      localStorage.getItem("JWT_PAYLOAD") &&
      localStorage.getItem("_ID")
    ) {
      this.setState({ isAuthenticated: true });
    } else if (this.state.quiz.mustBeSigned) {
      this.setState({ isAuthenticated: false });
    }
  };

  componentDidMount() {
    let id = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).id;
    this.setState({ id: id });
    this.refreshQuiz();
  }

  refreshQuiz = () => {
    axios
      .get(
        "/api/tests/get-quiz/" +
          qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id
      )
      .then((res) => {
        if (res.data) {
          this.setState({ isLoading: false, quiz: res.data.quiz });
          this.checkAuth();
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  render() {
    return !this.state.isLoading ? (
      <div className="view-quiz">
        {!this.state.isAuthenticated ? (
          <div className="not-auth">
            You must be logged in to take this quiz
          </div>
        ) : (
          <div className="content">
            <div className="header">{this.state.quiz.name}</div>
            <div className="body">
              <div className="right">
                <div className="questions-num">
                  {this.state.quiz.questions.length} Questions
                </div>
                <div
                  className={
                    this.state.quiz === localStorage.getItem("_ID")
                      ? "questions-wrapper"
                      : "questions-wrapper no-scroll"
                  }
                >
                  {this.state.quiz.questions.map((question, idx) => (
                    <div className="question" key={idx}>
                      {question.questionName}
                      {/* <div>
                        {this.state.quiz.id === localStorage.getItem("_ID")
                          ? question.questionName
                          : "question name"}
                      </div> */}
                      <div>
                        {question.correctAnswer}
                        {/* {this.state.quiz.id === localStorage.getItem("_ID")
                          ? question.correctAnswer
                          : "answer"} */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="footer">
              <div className="buttons-wrapper">
                <button onClick={() => this.props.history.goBack()}>
                  Go Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : (
      <h2>Loading</h2>
    );
  }
}
