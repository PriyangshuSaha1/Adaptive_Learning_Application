const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./models/Question');
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/adaptive-learning').then(async () => {
  const q = await Question.aggregate([{$match: {subject: 'JEE', topic: 'Physics', difficulty: 'easy'}}, {$sample: {size: 5}}]);
  console.log('Found:', q.length);
  process.exit(0);
});
