const fs = require('fs');
const file = 'C:/Users/KIIT0001/Adaptive_Learning_Application/backend/controllers/quizController.js';
let content = fs.readFileSync(file, 'utf8');

// Replace startQuiz and submitAnswer fallbacks
// We just remove the ultimate fallback 4 from startQuiz
content = content.replace(
  /\/\/ 4\. Ultimate fallback to literally any question[\s\S]*?needed -= moreQs\.length;\s*\}/g,
  '// 4. Removed ultimate fallback so we do NOT mix subjects'
);

// We also need to remove it from submitAnswer
content = content.replace(
  /if \(nextQuestion\.length === 0\) \{\s*nextQuestion = await Question\.aggregate\(\[\{\s*\$sample: \{ size: 1 \}\s*\}\]\);\s*\}/g,
  '// Removed ultimate fallback for nextQuestion to avoid mixing subjects'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Replaced successfully');
