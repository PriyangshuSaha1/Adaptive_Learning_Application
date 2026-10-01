const mongoose = require("mongoose");
require('dotenv').config();
const Question = require("./models/Question");

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/adaptive-learning').then(async () => {
  const subject = "JEE";
  const topic = "Physics";
  const questionCount = 10;
  
  // Simulate user having 5 attempted questions
  const attemptedIds = (await Question.find({subject, topic}).limit(5)).map(q => q._id);
  
  let needed = Number(questionCount);
  let questions = [];

  let easyQs = await Question.aggregate([
    { $match: { subject: { $regex: new RegExp('^' + subject + '$', "i") }, topic: { $regex: new RegExp('^' + topic + '$', "i") }, difficulty: { $regex: /^easy$/i }, _id: { $nin: attemptedIds } } },
    { $sample: { size: needed } },
  ]);
  questions.push(...easyQs);
  needed -= easyQs.length;

  if (needed > 0) {
    const fetchedIds = questions.map(q => q._id);
    let moreQs = await Question.aggregate([
      { $match: { subject: { $regex: new RegExp('^' + subject + '$', "i") }, topic: { $regex: new RegExp('^' + topic + '$', "i") }, _id: { $nin: [...attemptedIds, ...fetchedIds] } } },
      { $sample: { size: needed } },
    ]);
    questions.push(...moreQs);
    needed -= moreQs.length;
  }

  if (needed > 0) {
    const fetchedIds = questions.map(q => q._id);
    let moreQs = await Question.aggregate([
      { $match: { subject: { $regex: new RegExp('^' + subject + '$', "i") }, _id: { $nin: [...attemptedIds, ...fetchedIds] } } },
      { $sample: { size: needed } },
    ]);
    questions.push(...moreQs);
    needed -= moreQs.length;
  }

  if (needed > 0) {
    const fetchedIds = questions.map(q => q._id);
    let moreQs = await Question.aggregate([
      { $match: { _id: { $nin: [...attemptedIds, ...fetchedIds] } } },
      { $sample: { size: needed } },
    ]);
    questions.push(...moreQs);
    needed -= moreQs.length;
  }
  
  console.log(`Requested: 10, Got: ${questions.length}, Needed left: ${needed}`);
  process.exit(0);
});
