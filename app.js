const express = require("express");
const { connectDB } = require("./config/database");
const authRoute = require("./routes/authRoute");
const { errorHandler } = require("./middlewares/error");

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth/v1", authRoute);
app.use(errorHandler);

module.exports = app;
