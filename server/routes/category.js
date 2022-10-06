const express = require("express");
const { catModel } = require("../models/Subjects");
const router = express.Router();

// Register new Category
router.post("/registerCategory", (req, res) => {
  const category = new catModel({
    subject: req.body.subject,
    name: req.body.name,
  });
  category.save((error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.json({
        message: "Category Created Successfully",
        status: 200,
      });
    }
  });
});

//Get all categories
router.get("/getCategories", async (req, res) => {
  try {
    const categoryData = await catModel.find();
    res.status(201).json(categoryData);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

//Get Subject Categories
router.get("/get-subject-categories", async (req, res) => {
  catModel.find({ subject: req.query.subject }, (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.json(result);
    }
  });
});

// update user data
router.patch("/updatecategory/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateCategory = await catModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateCategory);
    res.status(201).json(updateCategory);
  } catch (error) {
    res.status(422).json(error);
  }
});

// Delete from db
router.delete("/deletecategory/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await catModel.findByIdAndDelete({ _id: id });
    console.log(deleteCategory);
    res.status(201).json(deleteCategory);
  } catch (error) {
    res.status(422).json(error);
  }
});
module.exports = router;
