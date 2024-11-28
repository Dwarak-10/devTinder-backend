const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    //Read the token from the req cookies
    const { token } = req.cookies;
    if (!token) {
      // throw new Error("Invalid Token!!!!!");
      return res.status(401).send("Please Login");
    }
    //Validate the token
    const decodedObj = await jwt.verify(token, "Dev@Tinder$0503");
    const { _id } = decodedObj;

    //Find the user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = { userAuth };
