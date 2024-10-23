const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://dwarakeshvaran:fCSZILjoKCD4mL5i@namastenodedk.57kvp.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
