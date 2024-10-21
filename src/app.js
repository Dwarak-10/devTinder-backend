const express = require("express");

const app = express();

app.get("/feed", (req, res) => {
  res.send("Welcome to the nodejs project");
});

app.get("/", (req, res) => {
  res.send("Welcome to the dashboard");
});
app.get("/test", (req, res) => {
  res.send("Hello test page");
});
app.listen(3000, () => {
  console.log("Server starting at port 3000");
});
