const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/users.router');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

const url = process.env.MONGO_DB_URI;

const connectToDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(url);
    console.log('connected to mongo db');
  } catch (err) {
    console.log("can't connect to database:", err);
    process.exit();
  }
};

connectToDB();

app.use('/', userRouter);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

app.listen(8018, () => {
  console.log(`Server is running on port 8018`);
});
