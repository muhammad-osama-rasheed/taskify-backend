const express = require("express");
const app = express();

const cors = require("cors");
const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.options("", cors(corsConfig));
app.use(cors(corsConfig));

require("dotenv").config();
const db = require("./configurations/db");

const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todo", todoRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("TODO APP BACKEND!");
});

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
