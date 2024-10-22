const express = require("express");

const app = express();

app.use(
  "/user",
  [
    (req, res, next) => {
      console.log("Request handler 1");
      // res.send("Send Successfully 1");
      next();
    },
  ],
  [
    (req, res, next) => {
      console.log("Request handler 2");
      // res.send("Send successfully 2");
      next();
    },
    (req, res, next) => {
      console.log("Request handler 3");
      res.send("Send successfully 3");
    },
  ]
);

app.listen(3000, () => {
  console.log("Server starting at port 3000");
});
