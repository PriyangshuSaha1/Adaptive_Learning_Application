const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./models/Question');

const realisticQuestions = [
  // JEE Physics
  { subject: 'JEE', topic: 'Physics', difficulty: 'medium', questionText: 'A car accelerates uniformly from rest to a speed of 108 km/h in 10 seconds. What is the distance covered by the car during this time?', options: ['150 m', '300 m', '450 m', '600 m'], correctAnswer: 0, explanation: 'v = 108 km/h = 30 m/s. a = (v-u)/t = 30/10 = 3 m/s^2. s = ut + 0.5at^2 = 0 + 0.5*3*100 = 150 m.' },
  { subject: 'JEE', topic: 'Physics', difficulty: 'hard', questionText: 'Two point charges +q and -q are placed at a distance d apart. The electric field at the midpoint of the line joining them is:', options: ['Zero', 'Directed towards +q', 'Directed towards -q', 'Perpendicular to the line joining them'], correctAnswer: 2, explanation: 'Electric field due to +q is away from it (towards -q), and due to -q is towards it. Both fields add up, pointing towards -q.' },
  { subject: 'JEE', topic: 'Physics', difficulty: 'easy', questionText: 'What is the SI unit of magnetic flux?', options: ['Tesla', 'Weber', 'Henry', 'Farad'], correctAnswer: 1, explanation: 'The SI unit of magnetic flux is Weber (Wb).' },
  { subject: 'JEE', topic: 'Physics', difficulty: 'medium', questionText: 'In a thermodynamic process, which of the following remains constant in an isothermal expansion?', options: ['Pressure', 'Volume', 'Temperature', 'Heat'], correctAnswer: 2, explanation: 'By definition, an isothermal process is one in which the temperature remains constant.' },
  { subject: 'JEE', topic: 'Physics', difficulty: 'hard', questionText: 'The moment of inertia of a solid sphere of mass M and radius R about its diameter is:', options: ['(2/3)MR^2', '(2/5)MR^2', '(1/2)MR^2', 'MR^2'], correctAnswer: 1, explanation: 'For a solid sphere, I = (2/5)MR^2.' },
  
  // JEE Chemistry
  { subject: 'JEE', topic: 'Chemistry', difficulty: 'medium', questionText: 'Which of the following is an electrophile?', options: ['NH3', 'H2O', 'BF3', 'CH3OH'], correctAnswer: 2, explanation: 'BF3 is an electron-deficient species (Lewis acid) and thus acts as an electrophile.' },
  { subject: 'JEE', topic: 'Chemistry', difficulty: 'easy', questionText: 'What is the oxidation state of Chromium in K2Cr2O7?', options: ['+4', '+5', '+6', '+7'], correctAnswer: 2, explanation: 'Let oxidation state be x. 2(+1) + 2x + 7(-2) = 0 => 2x - 12 = 0 => x = +6.' },
  { subject: 'JEE', topic: 'Chemistry', difficulty: 'hard', questionText: 'Which of the following polymers is formed by condensation polymerization?', options: ['Teflon', 'PVC', 'Polystyrene', 'Nylon 6,6'], correctAnswer: 3, explanation: 'Nylon 6,6 is a condensation polymer of hexamethylenediamine and adipic acid.' },
  { subject: 'JEE', topic: 'Chemistry', difficulty: 'medium', questionText: 'The hybridization of central atom in SF6 is:', options: ['sp3', 'sp3d', 'sp3d2', 'sp3d3'], correctAnswer: 2, explanation: 'Sulfur has 6 valence electrons and forms 6 single bonds. Total 6 domains = sp3d2.' },
  { subject: 'JEE', topic: 'Chemistry', difficulty: 'hard', questionText: 'Aldol condensation will not take place in:', options: ['Acetaldehyde', 'Acetone', 'Benzaldehyde', 'Propanone'], correctAnswer: 2, explanation: 'Benzaldehyde lacks alpha-hydrogens, which are required for aldol condensation.' },
  
  // JEE Mathematics
  { subject: 'JEE', topic: 'Mathematics', difficulty: 'medium', questionText: 'The derivative of e^(x^2) with respect to x is:', options: ['e^(x^2)', '2x * e^(x^2)', 'x^2 * e^(x^2)', 'e^(2x)'], correctAnswer: 1, explanation: 'Using the chain rule: d/dx(e^u) = e^u * du/dx, where u = x^2, du/dx = 2x.' },
  { subject: 'JEE', topic: 'Mathematics', difficulty: 'hard', questionText: 'What is the value of limit x->0 (sin x - x) / x^3 ?', options: ['-1/6', '1/6', '-1/3', '0'], correctAnswer: 0, explanation: 'Using Taylor expansion: sin x = x - x^3/3! + ... -> (sin x - x)/x^3 = -1/6.' },
  { subject: 'JEE', topic: 'Mathematics', difficulty: 'easy', questionText: 'The probability of getting a sum of 7 when two dice are rolled is:', options: ['1/6', '1/12', '1/36', '7/36'], correctAnswer: 0, explanation: 'Favorable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. Total = 36. Prob = 6/36 = 1/6.' },
  { subject: 'JEE', topic: 'Mathematics', difficulty: 'medium', questionText: 'If the matrix A is symmetric, then A^T equals:', options: ['-A', 'A', 'I', 'A^-1'], correctAnswer: 1, explanation: 'By definition, a matrix is symmetric if its transpose equals itself (A^T = A).' },
  { subject: 'JEE', topic: 'Mathematics', difficulty: 'hard', questionText: 'The number of solutions of the equation sin(x) = x/10 is:', options: ['1', '3', '5', '7'], correctAnswer: 3, explanation: 'Graphing y = sin(x) and y = x/10 shows 7 intersection points (1 at origin, 3 on each side).' },

  // CS / Algorithms
  { subject: 'CS', topic: 'Algorithms', difficulty: 'medium', questionText: 'What is the worst-case time complexity of QuickSort?', options: ['O(N log N)', 'O(N^2)', 'O(N)', 'O(log N)'], correctAnswer: 1, explanation: 'The worst case occurs when the pivot elements are consistently the greatest or smallest elements, taking O(N^2) time.' },
  { subject: 'CS', topic: 'Algorithms', difficulty: 'easy', questionText: 'Which data structure is typically used to implement Breadth-First Search (BFS)?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correctAnswer: 1, explanation: 'BFS uses a Queue to keep track of nodes to visit next level by level.' },
  { subject: 'CS', topic: 'Data Structures', difficulty: 'medium', questionText: 'What is the time complexity of searching for an element in a balanced Binary Search Tree?', options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'], correctAnswer: 1, explanation: 'A balanced BST halves the search space at each step, resulting in O(log N) search time.' },
  { subject: 'CS', topic: 'Data Structures', difficulty: 'hard', questionText: 'Which of the following is true for a B-Tree?', options: ['All leaves are at the same depth', 'It is a strictly binary tree', 'Nodes cannot have more than 2 children', 'It is typically used for in-memory arrays'], correctAnswer: 0, explanation: 'In a valid B-Tree, all leaf nodes must be exactly at the same depth.' },
  { subject: 'CS', topic: 'Algorithms', difficulty: 'hard', questionText: 'Which algorithm is used to find the shortest path in a graph with negative edge weights?', options: ['Dijkstra', 'Kruskal', 'Bellman-Ford', 'Prim'], correctAnswer: 2, explanation: 'Bellman-Ford can handle negative weights, whereas Dijkstra fails with negative cycles.' },
  
  // AI / Machine Learning
  { subject: 'AI', topic: 'Machine Learning', difficulty: 'easy', questionText: 'In Machine Learning, what does "Overfitting" refer to?', options: ['Model performs well on training data but poorly on test data', 'Model performs poorly on both', 'Model predicts everything as 0', 'Model trains too fast'], correctAnswer: 0, explanation: 'Overfitting happens when a model learns the training data noise instead of general patterns.' },
  { subject: 'AI', topic: 'Machine Learning', difficulty: 'medium', questionText: 'Which of the following is an unsupervised learning algorithm?', options: ['Linear Regression', 'Logistic Regression', 'K-Means Clustering', 'Random Forest'], correctAnswer: 2, explanation: 'K-Means clustering categorizes unlabelled data without explicit target labels.' },
  { subject: 'AI', topic: 'Neural Networks', difficulty: 'hard', questionText: 'What problem does the ReLU activation function primarily solve compared to Sigmoid?', options: ['Overfitting', 'Vanishing Gradient', 'Exploding Gradient', 'High loss'], correctAnswer: 1, explanation: 'ReLU does not saturate for positive inputs, thus preventing the vanishing gradient problem common in deep networks.' },
  { subject: 'AI', topic: 'Neural Networks', difficulty: 'medium', questionText: 'What is the purpose of Dropout in a Neural Network?', options: ['Increase training speed', 'Prevent overfitting', 'Increase model size', 'Convert it to a CNN'], correctAnswer: 1, explanation: 'Dropout randomly zeroes out activations during training to force the network to learn robust features, reducing overfitting.' },
  { subject: 'AI', topic: 'Machine Learning', difficulty: 'medium', questionText: 'What is the fundamental difference between classification and regression?', options: ['Regression predicts continuous values, Classification predicts discrete labels', 'Classification uses neural networks, regression does not', 'Regression is unsupervised', 'Classification is faster'], correctAnswer: 0, explanation: 'Regression outputs continuous values (e.g., house prices), classification outputs discrete categories (e.g., dog vs cat).' }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/adaptive-learning').then(async () => {
  // Delete dummy sample questions
  const deleteResult = await Question.deleteMany({ questionText: { $regex: /Sample generated question/ } });
  console.log(`Deleted ${deleteResult.deletedCount} dummy questions.`);

  // Insert realistic ones
  await Question.insertMany(realisticQuestions);
  console.log(`Inserted ${realisticQuestions.length} realistic questions!`);
  
  // To ensure they don't get stuck with 1 question again, let's copy the realistic questions to fill exactly 5 per topic
  
  const topicsMap = {
    'JEE': ['Physics', 'Chemistry', 'Mathematics'],
    'CS': ['Data Structures', 'Algorithms'],
    'AI': ['Machine Learning', 'Neural Networks']
  };
  
  let dupCount = 0;
  for (const subject of Object.keys(topicsMap)) {
    for (const topic of topicsMap[subject]) {
      const qCount = await Question.countDocuments({ subject, topic });
      if (qCount < 6) {
        const toAdd = 6 - qCount;
        const existing = await Question.find({ subject, topic });
        if (existing.length > 0) {
            for (let i = 0; i < toAdd; i++) {
              const clone = existing[i % existing.length].toObject();
              delete clone._id;
              clone.questionText = clone.questionText + ` (Variant ${i+1})`;
              await Question.create(clone);
              dupCount++;
            }
        }
      }
    }
  }
  
  console.log(`Added ${dupCount} variants to guarantee at least 5 questions per topic.`);
  process.exit(0);
});
