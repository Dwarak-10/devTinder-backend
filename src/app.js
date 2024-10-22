const express = require("express");

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);
// app.use("/user", );

app.get("/admin/getAllData", (req, res) => {
  res.send("Data sent successfully");
});

app.get("/user/userData", userAuth, (req, res) => {
  res.send("User data sent");
});
app.post("/user/login", (req, res) => {
  res.send("User logged in successfully");
});

app.listen(3000, () => {
  console.log("Server starting at port 3000");
});
