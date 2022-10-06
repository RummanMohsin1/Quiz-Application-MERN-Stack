import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./Category.css";
import Toast from "../Toast/Toast";

const Category = () => {
  //useStates
  const [subject, setselectedSubject] = useState([]);
  const [subs, setsubs] = useState([]);
  const [name, setCategory] = useState("");
  const [toast, settoast] = useState(false);

  //Navigation
  const history = useHistory();
  const navigateTo = () => history.push("/ViewCategories"); //eg.history.push('/login');

  //retreive Subject ID
  const handleSubjectsID = (event) => {
    let subjectypeobj = {
      _id: event.target.value,
    };
    setselectedSubject(subjectypeobj);
    console.log(subjectypeobj);
  };

  //Fetch Subjects from database
  const getList = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/subjects/getSubjects"
      );
      const jsonData = await response.json();
      setsubs(jsonData);
      console.log(setsubs(jsonData));

      console.log(setsubs);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  const addinpdata = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name,
        subject: subject._id,
      };
      console.log(body);
      const response = await fetch(
        "http://localhost:5000/api/categories/registerCategory",
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
        <div className="header">Create Category</div>
        <div className="form card">
          <select
            class="selectpicker"
            className="input select"
            value={subs.name}
            key={subs._id}
            onChange={(e) => handleSubjectsID(e)}
          >
            <option>-------Select Category-------</option>
            {subs.map((x) => (
              <option value={x._id}>{x.name}</option>
            ))}
          </select>
          <br></br>

          <input
            type="text"
            placeholder="Enter Category"
            class="form-control"
            name="category"
            className="input"
            value={name}
            onChange={(event) => setCategory(event.target.value)}
            required
          />
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

export default Category;
