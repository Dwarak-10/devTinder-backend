const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    // console.log("Monog_URI : ", MONGO_URI);
    await mongoose.connect(MONGO_URI);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
