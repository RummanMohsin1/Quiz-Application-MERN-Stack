import React, { useEffect, useState } from "react";
import "./Category.css";
import Sidebar from "../Sidebar/Sidebar";
import Edit from "./Edit";
const CategoryList = () => {
  const [name, setnames] = useState([]);
  const deleteTodo = async (id) => {
    try {
      const deleteT = await fetch(
        `http://localhost:5000/api/categories/deletecategory/${id}`,
        {
          method: "DELETE",
        }
      );
      setnames(name.filter((todo) => todo.todo_id !== id));
      window.location = "/ViewCategories";
    } catch (err) {
      console.error(err.message);
    }
  };

  const getSubjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/categories/getCategories"
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
              {name.map((categories) => (
                <tr key={categories.id}>
                  <td>{categories.name}</td>
                  <td>
                    <Edit categories={categories} />
                  </td>
                  <td>
                    <button
                      className="btndelete"
                      onClick={() => deleteTodo(categories._id)}
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
export default CategoryList;
