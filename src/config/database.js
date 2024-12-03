const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
