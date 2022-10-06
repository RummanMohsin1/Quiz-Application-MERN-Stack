const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const subRoutes = require("./routes/subjects");
const catRoutes = require("./routes/category");
const testRoutes = require("./routes/tests");

// const quizRoutes = require("./routes/quizzes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
let server;

// middlware config

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
app.use(bodyParser.json({ limit: "20mb" }));

//APIs import
app.use("/api/users/", userRoutes);
// app.use('/api/quizzes/', quizRoutes);
app.use("/api/subjects/", subRoutes);
app.use("/api/categories/", catRoutes);
app.use("/api/tests/", testRoutes);

//Db Connection
mongoose
  .connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connection established"))
  .catch((er) => console.log("Error connecting to mongodb instance: ", er));

//Server port
server = app.listen(PORT, () => {
  console.log(`Node server running on port: ${PORT}`);
});
