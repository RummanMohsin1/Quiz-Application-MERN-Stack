import axios from "axios";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import store from "./store";
import Lists from "./components/Subject/ViewSubjects";
import Category from "./components/Category/Category";
import CategoryList from "./components/Category/ViewCategories";
import CreateQuiz from "./components/Test/test";
import Subject from "./components/Subject/Subject";
import ViewQuiz from "./components/ViewQuiz/ViewQuiz";
class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem("_ID")) {
      axios
        .get(`/api/users/${localStorage.getItem("_ID")}`)
        .then((res) => {
          store.dispatch({
            user: res.data.user,
            type: "set_user",
          });
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" component={Auth} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/subject" component={Subject} />
            <Route path="/viewSubjects" component={Lists} />
            <Route path="/category" component={Category} />
            <Route path="/ViewCategories" component={CategoryList} />
            <Route path="/Quiz" component={CreateQuiz} />
            <Route path="/view-quiz" component={ViewQuiz} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
