const mongoose = require("mongoose");
const Question = require("./models/Question");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/adaptive-learning").then(async () => {
  await Question.updateMany({ subject: 'JEE' }, { $set: { topic: 'Physics' } });
  await Question.updateMany({ subject: 'NEET' }, { $set: { topic: 'Biology' } });
  await Question.updateMany({ subject: 'Class 10' }, { $set: { topic: 'Science' } });
  await Question.updateMany({ subject: 'Class 12' }, { $set: { topic: 'Mathematics' } });
  console.log('Topics merged');
  process.exit(0);
});
