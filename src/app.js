const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/getUserData", (req, res) => {
  // try {
  throw new Error("abcd");
  res.send("Send User Data");
  // } catch (err) {
  //   if (err) {
  //     res.status(500).send("Something went wrong");
  //   }
  // }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => {
  console.log("Server starting at port 3000");
});
