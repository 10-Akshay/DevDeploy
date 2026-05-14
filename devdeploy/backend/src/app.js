require("dotenv").config();

const express = require("express");

const connectDB = require("../config/db");

const authRoutes = require("./routes/auth");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(4000, () => {
  console.log("DevDeploy backend running on http://localhost:4000");
});