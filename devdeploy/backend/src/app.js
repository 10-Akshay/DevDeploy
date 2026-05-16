const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../config/db");

const authRoutes = require("./routes/auth");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(4000, () => {
  console.log("DevDeploy backend running on http://localhost:4000");
});