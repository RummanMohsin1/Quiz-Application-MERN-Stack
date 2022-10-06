import React, { useState } from "react";
import "./Category.css";
const Edit = ({ categories }) => {
  const [name, setname] = useState(categories.name);

  //edit Student func
  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      const body = { name };
      const response = await fetch(
        `http://localhost:5000/api/categories/updatecategory/${categories._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      window.location = "/ViewCategories";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div class="container">
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        className="btnEdit"
        data-target={`#id${categories._id}`}
      >
        Edit
      </button>

      <div class="modal" id={`id${categories._id}`}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Subject</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="name"
                className="form-control"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateCategory(e)}
              >
                Edit
              </button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Edit;
