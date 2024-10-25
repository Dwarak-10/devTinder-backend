const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const validator = require("validator");
const { validationData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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
    await user.save();
    res.send("User data send successfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

app.post("/login", async (req, res) => {
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

      res.send("Login Successfully");
    }
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res.send(user);
  } catch (err) {
    res.status(400).send("Somethinf went wrong" + err);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " wants a connection");
  } catch (err) {
    res.status(400).send("Somethinf went wrong" + err);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server starting at port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });
