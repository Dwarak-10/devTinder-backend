const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " wants a connection");
  } catch (err) {
    res.status(400).send("Somethinf went wrong" + err);
  }
});

module.exports = requestRouter;
