const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/adaptive-learning').then(async () => {
  const subjects = ['JEE', 'NEET', 'Class 10', 'Class 12', 'CS', 'AI'];
  const topicsMap = {
    'JEE': ['Physics', 'Chemistry', 'Mathematics'],
    'NEET': ['Physics', 'Chemistry', 'Biology'],
    'Class 10': ['Science', 'Mathematics'],
    'Class 12': ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    'CS': ['Data Structures', 'Algorithms', 'OS', 'DBMS'],
    'AI': ['Machine Learning', 'Neural Networks', 'NLP']
  };

  let count = 0;
  for (const subject of subjects) {
    const topics = topicsMap[subject];
    for (const topic of topics) {
      const qCount = await Question.countDocuments({ subject, topic });
      if (qCount < 10) {
        const toAdd = 15 - qCount;
        for (let i = 0; i < toAdd; i++) {
          const diffs = ['easy', 'medium', 'hard'];
          const difficulty = diffs[Math.floor(Math.random() * 3)];
          
          await Question.create({
            subject,
            topic,
            difficulty,
            questionText: `Sample generated question ${i+1} for ${subject} - ${topic}. What is the correct answer?`,
            options: [
              `Option A for ${subject} ${i}`,
              `Option B for ${subject} ${i}`,
              `Option C for ${subject} ${i}`,
              `Option D for ${subject} ${i}`
            ],
            correctAnswer: Math.floor(Math.random() * 4),
            explanation: `This is the explanation for ${subject} - ${topic} question ${i+1}.`
          });
          count++;
        }
      }
    }
  }
  console.log(`Massive seed complete! Inserted ${count} dummy questions.`);
  process.exit(0);
});
