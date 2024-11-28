const express = require("express");
const { validationData } = require("../utils/validation");
const validator = require("validator");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    // 1. validating the data
    validationData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // 2. password encryption
    const hashedPassword = await bcrypt.hash(password, 10);

    //Creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    if (!validator.isStrongPassword(user.password)) {
      throw new Error("Enter a strong password : " + user.password);
    }
    // await user.save();
    // res.send("User data send successfully");
    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Filtering the collection by the emailId field in the document using findOne method
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Credential");
    } else if (!isPasswordValid) {
      throw new Error("Invalid Credential");
    } else {
      // Create a JWT Token
      const token = await user.getJWT();

      // Add the token to the Cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 360000),
      });

      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout successfully!!");
});

module.exports = authRouter;
