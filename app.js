const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const authRoute = require('./routes/authRoute');
const { errorHandler } = require('./middlewares/error');
const config = require('./config/config');

const app = express();
app.use(
  cors({
    origin: config.origin,
  })
);
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth/v1', authRoute);
app.use(errorHandler);

module.exports = app;
