const express = require("express");
const { validateEditProfileData } = require("../utils/validation");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
    // console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    // console.log(loggedInUser);

    res.json({
      message: `${loggedInUser?.firstName}, your profile is updated`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error : " + err);
  }
});

module.exports = profileRouter;
