const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://devtinder-1.netlify.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");
const userRouter = require("./router/user");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server starting at port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected", err);
  });
