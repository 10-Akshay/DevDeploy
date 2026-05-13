require("dotenv").config();

const express = require("express");

const connectDB = require("../config/db");

const app = express();

connectDB();

app.listen(4000, () => {
  console.log("DevDeploy backend running on http://localhost:4000");
});