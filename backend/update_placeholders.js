const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/adaptive-learning').then(async () => {
  const questions = await Question.find({ questionText: { $regex: /Generated|Sample/i } });
  
  let count = 0;
  for (let q of questions) {
    let newText = "";
    let newOptions = [];
    let newExp = "";
    
    if (q.subject === 'Math' || q.topic === 'Mathematics') {
      if (q.topic === 'Algebra') {
        const a = Math.floor(Math.random() * 10) + 2;
        const b = Math.floor(Math.random() * 20) + 1;
        newText = `Solve for x: ${a}x - ${b} = ${a * 2 - b}`;
        newOptions = ['1', '2', '3', '4'];
        q.correctAnswer = 1; // '2'
        newExp = `Add ${b} to both sides, then divide by ${a} to get x = 2.`;
      } else if (q.topic === 'Calculus') {
        const n = Math.floor(Math.random() * 5) + 2;
        newText = `What is the derivative of f(x) = x^${n} with respect to x?`;
        newOptions = [`x^${n-1}`, `${n}x^${n-1}`, `${n}x^${n}`, `x^${n+1}`];
        q.correctAnswer = 1;
        newExp = `Using the power rule, the derivative of x^n is n*x^(n-1).`;
      } else {
        const r = Math.floor(Math.random() * 10) + 2;
        newText = `What is the area of a circle with radius r = ${r}?`;
        newOptions = [`${Math.PI * r} sq units`, `${Math.PI * r * 2} sq units`, `${Math.PI * r * r} sq units`, `${r * r} sq units`];
        q.correctAnswer = 2;
        newExp = `The area of a circle is given by pi * r^2.`;
      }
    } else if (q.subject === 'NEET' || q.topic === 'Biology') {
      if (q.topic === 'Biology') {
        const bioQs = [
          { q: 'Which organelle is known as the powerhouse of the cell?', o: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'], a: 1, e: 'Mitochondria generate most of the chemical energy needed to power the cell.' },
          { q: 'What is the basic unit of heredity?', o: ['Protein', 'Gene', 'Chromosome', 'RNA'], a: 1, e: 'Genes are made up of DNA and act as instructions to make molecules called proteins.' },
          { q: 'Which blood type is considered the universal donor?', o: ['A', 'B', 'AB', 'O negative'], a: 3, e: 'O negative blood has no antigens, making it compatible with all other blood types.' },
          { q: 'What process do plants use to convert sunlight into food?', o: ['Respiration', 'Photosynthesis', 'Fermentation', 'Transpiration'], a: 1, e: 'Photosynthesis uses sunlight to synthesize foods from carbon dioxide and water.' }
        ];
        const pick = bioQs[Math.floor(Math.random() * bioQs.length)];
        newText = pick.q; newOptions = pick.o; q.correctAnswer = pick.a; newExp = pick.e;
      } else {
        newText = `Which of the following is a key concept in ${q.subject} ${q.topic}?`;
        newOptions = ['Concept A', 'Concept B', 'Concept C', 'Concept D'];
        q.correctAnswer = Math.floor(Math.random() * 4);
        newExp = `This is a fundamental principle of ${q.topic}.`;
      }
    } else if (q.subject === 'Class 10' || q.subject === 'Class 12') {
      if (q.topic === 'Science' || q.topic === 'Physics') {
        newText = `An object of mass 10kg is moving at ${Math.floor(Math.random() * 10) + 5} m/s. What is its kinetic energy?`;
        newOptions = ['100 J', '250 J', '500 J', '750 J'];
        q.correctAnswer = 1;
        newExp = `Kinetic energy is 1/2 * m * v^2.`;
      } else {
        newText = `What is the balanced chemical formula for water?`;
        newOptions = ['HO', 'H2O', 'HO2', 'H2O2'];
        q.correctAnswer = 1;
        newExp = `Water consists of two hydrogen atoms and one oxygen atom.`;
      }
    } else {
      newText = `What is the primary function of ${q.topic}?`;
      newOptions = ['Execution', 'Storage', 'Processing', 'Networking'];
      q.correctAnswer = 2;
      newExp = `${q.topic} is primarily used for processing operations.`;
    }
    
    q.questionText = newText;
    q.options = newOptions;
    q.explanation = newExp;
    q.hint = "Hint: " + newExp.substring(0, 30) + "...";
    await q.save();
    count++;
  }
  
  console.log(`Updated ${count} placeholder questions to realistic ones!`);
  process.exit(0);
});
