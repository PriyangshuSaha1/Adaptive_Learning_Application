const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/adaptive-learning').then(async () => {
  const subjects = ['Math'];
  const topicsMap = {
    'Math': ['Algebra', 'Calculus', 'Geometry']
  };

  let count = 0;
  for (const subject of subjects) {
    const topics = topicsMap[subject];
    for (const topic of topics) {
      const qCount = await Question.countDocuments({ subject, topic });
      if (qCount < 20) {
        const toAdd = 20 - qCount;
        for (let i = 0; i < toAdd; i++) {
          const diffs = ['easy', 'medium', 'hard'];
          const difficulty = diffs[Math.floor(Math.random() * 3)];
          
          await Question.create({
            subject,
            topic,
            difficulty,
            questionText: `Generated Math Question ${i+1} for ${topic}. What is the result?`,
            options: [
              `Option A for ${subject} ${topic} ${i}`,
              `Option B for ${subject} ${topic} ${i}`,
              `Option C for ${subject} ${topic} ${i}`,
              `Option D for ${subject} ${topic} ${i}`
            ],
            correctAnswer: Math.floor(Math.random() * 4),
            explanation: `Explanation for ${subject} - ${topic} question ${i+1}.`,
            hint: `Hint for ${subject} - ${topic} question ${i+1}.`
          });
          count++;
        }
      }
    }
  }
  console.log(`Added ${count} questions for Math.`);
  process.exit(0);
});
