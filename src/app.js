const express = require("express");

const app = express();

//Order of the routes matters alot

//This will only call the GET call to the /user
app.get("/user", (req, res) => {
  res.send({
    firstName: "Dwarakesh",
    lastName: "DK",
    mobileNo: 9080214419,
  });
});

//This will only call the POST call to the user
app.post("/user", (req, res) => {
  res.send("Send Data successfully");
});

//This will only call the POST call to the user
app.delete("/user", (req, res) => {
  res.send("Deleted Successfully");
});

// This will match all the HTTP methos API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello test page");
});

app.listen(3000, () => {
  console.log("Server starting at port 3000");
});
