const express = require("express");

const app = express();

//Order of the routes matters alot

//This is how we use dynamic values and access by req.params
app.get("/user/:id/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({
    firstName: "Dwarakesh",
    lastName: "DK",
  });
});

//Here we use req.query to access the query in the url which is after the "?"
app.post("/user", (req, res) => {
  console.log(req.query);
  res.send("Sent successfully");
});

app.listen(3000, () => {
  console.log("Server starting at port 3000");
});
