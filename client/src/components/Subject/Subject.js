import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./Subject.css";
import Toast from "../Toast/Toast";

const Subject = () => {
  //useStates
  const [toast, settoast] = useState(false);
  const [name, setname] = useState("");
  const [inpval, setINP] = useState({
    name: "",
  });

  //Navigation
  const history = useHistory();
  const navigateTo = () => history.push("/viewSubjects"); //eg.history.push('/login');

  //Assigning value to subject name
  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  //Posting data to database
  const addinpdata = async (e) => {
    e.preventDefault();
    try {
      const body = { name };
      const response = await fetch(
        "http://localhost:5000/api/subjects/registerSubject",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      settoast(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="create-quiz-wrapper">
      <Toast model={toast} message="Subject Created" />
      <div>
        <Sidebar />
      </div>
      <div className="main">
        <div className="header">Create Subject</div>
        <div className="form card">
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Enter Subject"
            name="name"
            class="form-control"
            className="input"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <br></br>
          <div className="btn-wrapper">
            <div className="btn" onClick={addinpdata}>
              Save
            </div>
            <div className="btn btn2" onClick={navigateTo}>
              View
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subject;
