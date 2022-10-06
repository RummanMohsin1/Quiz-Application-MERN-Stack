import React, { useEffect, useState } from "react";
import "./Subject.css";
import Sidebar from "../Sidebar/Sidebar";
import Edit from "./Edit";
const Lists = () => {
  const [name, setnames] = useState([]);

  const deleteTodo = async (id) => {
    try {
      const deleteT = await fetch(
        `http://localhost:5000/api/subjects/deleteSubject/${id}`,
        {
          method: "DELETE",
        }
      );
      setnames(name.filter((todo) => todo.todo_id !== id));
      window.location = "/viewSubjects";
    } catch (err) {
      console.error(err.message);
    }
  };

  const getSubjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/subjects/getSubjects"
      );
      const jsonData = await response.json();
      setnames(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <>
      <div className="create-quiz-wrapper">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="container contact_div">
          <table class="table mt-5 text-center tableX">
            <thead>
              <tr>
                <th>Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {name.map((subjects) => (
                <tr key={subjects.id}>
                  <td>{subjects.name}</td>
                  <td>
                    <Edit subjects={subjects} />
                  </td>
                  <td>
                    <button
                      className="btndelete"
                      onClick={() => deleteTodo(subjects._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Lists;
