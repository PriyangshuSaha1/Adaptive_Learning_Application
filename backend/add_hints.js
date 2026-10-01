const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/adaptive-learning').then(async () => {
  const questions = await Question.find({});
  let count = 0;
  for (let q of questions) {
    if (!q.hint) {
      if (q.explanation && q.explanation.length > 10) {
        const words = q.explanation.split(' ');
        q.hint = "Hint: " + words.slice(0, Math.max(3, Math.floor(words.length / 2))).join(' ') + "...";
      } else {
        q.hint = "Hint: Think about the core formulas for this topic.";
      }
      await q.save();
      count++;
    }
  }
  console.log(`Updated ${count} questions with hints!`);
  process.exit(0);
});
