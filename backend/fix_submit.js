const fs = require('fs');
const file = 'C:/Users/KIIT0001/Adaptive_Learning_Application/backend/controllers/quizController.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  'const { questionId, selectedAnswer, timeTaken, hintUsed } = req.body;',
  'const { questionId, selectedAnswer, timeTaken, hintUsed, excludeIds = [] } = req.body;'
);

content = content.replace(
  'const attemptedQuestions = attemptedRaw',
  `const excludeObjIds = excludeIds.map(id => { try { return new mongoose.Types.ObjectId(id); } catch { return null; } }).filter(Boolean);
    const attemptedQuestions = [...attemptedRaw, ...excludeObjIds]`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Replaced successfully');
