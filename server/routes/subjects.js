const express = require("express");
const router = express.Router();
const { subModel } = require("../models/Subjects");

// Register new Subject
router.post("/registerSubject", async (req, res) => {
  const subject = new subModel({
    name: req.body.name,
  });
  const presub = await subModel.findOne({ name: req.query.name });
  if (presub) {
    res.status(422).json("This subject is already in db");
  } else {
    subject.save((error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.json({
          message: "Subject Created Successfully",
          status: 200,
        });
      }
    });
  }
});

// Get all subModel
router.get("/getSubjects", async (req, res) => {
  try {
    const subsdata = await subModel.find();
    res.status(201).json(subsdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

// Get subModel by id
router.get("/getSubID/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subindividual = await subModel.findById({ _id: id });
    console.log(subindividual);
    res.status(201).json(subindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

// update user data
router.patch("/updateSubject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatesubject = await subModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updatesubject);
    res.status(201).json(updatesubject);
  } catch (error) {
    res.status(422).json(error);
  }
});

// delete user
router.delete("/deleteSubject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletesubject = await subModel.findByIdAndDelete({ _id: id });
    console.log(deletesubject);
    res.status(201).json(deletesubject);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
