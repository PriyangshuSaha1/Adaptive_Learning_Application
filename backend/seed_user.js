const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Response = require('./models/Response');
const QuizAttempt = require('./models/QuizAttempt');
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/adaptive-learning').then(async () => {
  await User.deleteMany({});
  await Response.deleteMany({});
  await QuizAttempt.deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  const user = await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: hashedPassword,
    fullname: 'Test User'
  });

  const q = await Question.findOne();
  if (q) {
    await Response.create({ user: user._id, question: q._id, selectedAnswer: 1, isCorrect: true, timeTaken: 10, subject: q.subject, difficulty: q.difficulty || 'medium' });
    await QuizAttempt.create({ user: user._id, subject: q.subject, topic: q.topic, score: 10, totalQuestions: 10, totalTime: 100, accuracy: 100, topicsMastery: [{ topic: q.topic, masteryLevel: 100 }] });
  }

  console.log('Fake user updated with HASHED password! Email: test@example.com, Password: password123');
  process.exit(0);
});
