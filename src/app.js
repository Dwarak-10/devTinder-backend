const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const validator = require("validator");
const { validationData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

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

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Credential");
    } else if (!isPasswordValid) {
      throw new Error("Invalid Credential");
    } else {
      res.send("Login Successfully");
    }
  } catch (err) {
    res.status(400).send("Something went wrong => " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("Delete user successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  const ALLOWED_UPDATES = ["gender", "age", "skills", "about", "photoUrl"];
  try {
    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Add only 10 skills");
    }

    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong => " + err.message);
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
