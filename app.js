// import express from express;
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
const route = require("./src/routes/auth");
app.set("views", path.join(__dirname, "src", "views"));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.json());
app.get("/", (req, res) => {
  res.render("create");
  res.send("Hello World!");
});
app.get("/login", (req, res) => {
  res.render("login");
  res.send("Hello World!");
});
app.get("/userdetail", (req, res) => {
  res.render("getuser");
  res.send("Hello World!");
});

app.use("/api/user", route);
app.listen(3000, async () => {
  await connectDB();
  console.log("Example app listening on port 3000!");
});
