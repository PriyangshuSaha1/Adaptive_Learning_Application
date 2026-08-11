const mongoose = require("mongoose");
const Question = require("./models/Question");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/adaptive-learning");

const data = {
  "JEE": [
    { topic: "Physics", q: "The escaping velocity of a body on the surface of the earth is 11.2 km/s. If the earth's mass increases to twice its present value and the radius of the earth becomes half, the escape velocity would become:", options: ["5.6 km/s", "11.2 km/s", "22.4 km/s", "44.8 km/s"], ans: 2, exp: "Escape velocity v = √(2GM/R). If M becomes 2M and R becomes R/2, v becomes √(2G(2M)/(R/2)) = √(4 * 2GM/R) = 2√(2GM/R) = 2 * 11.2 = 22.4 km/s." },
    { topic: "Physics", q: "In a Young's double slit experiment, if the separation between the slits is halved and the distance between the slits and the screen is doubled, the fringe width will:", options: ["Be halved", "Be doubled", "Quadrupled", "Remain same"], ans: 2, exp: "Fringe width β = λD/d. If D becomes 2D and d becomes d/2, then β' = λ(2D)/(d/2) = 4λD/d = 4β." },
    { topic: "Chemistry", q: "Which of the following is not an ore of iron?", options: ["Magnetite", "Hematite", "Siderite", "Bauxite"], ans: 3, exp: "Bauxite is an ore of Aluminium, not Iron. The others are iron ores." },
    { topic: "Mathematics", q: "The value of the integral ∫(from 0 to π/2) log(tan x) dx is:", options: ["π/2", "π/4", "0", "1"], ans: 2, exp: "Let I = ∫ log(tan x) dx. Using the property ∫ f(x) dx = ∫ f(a-x) dx, I = ∫ log(cot x) dx. Adding both, 2I = ∫ log(tan x * cot x) dx = ∫ log(1) dx = 0." },
    { topic: "Physics", q: "The half-life of a radioactive substance is 30 days. What is the time taken for 3/4th of its original mass to disintegrate?", options: ["30 days", "60 days", "90 days", "120 days"], ans: 1, exp: "Amount remaining = 1/4th. Since (1/2)^2 = 1/4, it takes 2 half-lives. 2 * 30 = 60 days." }
  ],
  "NEET": [
    { topic: "Biology", q: "The site of respiration in bacteria is:", options: ["Episome", "Mesosome", "Ribosome", "Microsome"], ans: 1, exp: "Mesosomes are the infoldings of the cell membrane in bacteria which function similarly to mitochondria in eukaryotes." },
    { topic: "Biology", q: "Which one of the following correctly describes the location of some body parts in the earthworm?", options: ["Four pairs of spermathecae in 4-7 segments", "One pair of ovaries attached at intersegmental septum of 14th and 15th segments", "Two pairs of testes in 10th and 11th segments", "Two pairs of accessory glands in 16th and 18th segments"], ans: 2, exp: "Earthworms have two pairs of testes located in the 10th and 11th segments." },
    { topic: "Chemistry", q: "Among the following, the most reactive towards alcoholic KOH is:", options: ["CH2=CHBr", "CH3COCH2CH2Br", "CH3CH2Br", "CH3CH2CH2Br"], ans: 1, exp: "Presence of electron withdrawing carbonyl group increases the acidity of beta hydrogen, making dehydrohalogenation faster." },
    { topic: "Biology", q: "What is the role of NAD+ in cellular respiration?", options: ["It functions as an enzyme", "It functions as an electron carrier", "It is the final electron acceptor", "It is a nucleotide source for ATP synthesis"], ans: 1, exp: "NAD+ functions as a coenzyme and an electron carrier in cellular respiration." },
    { topic: "Biology", q: "Which of the following is an occupational respiratory disorder?", options: ["Anthracis", "Silicosis", "Botulism", "Emphysema"], ans: 1, exp: "Silicosis is caused by inhalation of silica dust, common in occupations like mining." }
  ],
  "Class 10": [
    { topic: "Science", q: "What happens when dilute hydrochloric acid is added to iron filings?", options: ["Hydrogen gas and iron chloride are produced", "Chlorine gas and iron hydroxide are produced", "No reaction takes place", "Iron salt and water are produced"], ans: 0, exp: "Fe + 2HCl -> FeCl2 + H2. Hydrogen gas and Iron(II) chloride are produced." },
    { topic: "Mathematics", q: "The roots of the quadratic equation x^2 - 3x - 10 = 0 are:", options: ["-2, 5", "2, -5", "-2, -5", "2, 5"], ans: 0, exp: "x^2 - 5x + 2x - 10 = 0 => x(x-5) + 2(x-5) = 0. Roots are -2 and 5." },
    { topic: "Science", q: "The least distance of distinct vision for a young adult with normal vision is about:", options: ["25 m", "2.5 cm", "25 cm", "2.5 m"], ans: 2, exp: "For a normal eye, the near point or least distance of distinct vision is 25 cm." },
    { topic: "Mathematics", q: "If the perimeter and the area of a circle are numerically equal, then the radius of the circle is:", options: ["2 units", "π units", "4 units", "7 units"], ans: 0, exp: "2πr = πr^2 => r = 2 units." },
    { topic: "Science", q: "Which of the following is a plant hormone?", options: ["Insulin", "Thyroxin", "Oestrogen", "Cytokinin"], ans: 3, exp: "Cytokinin is a plant hormone that promotes cell division." }
  ],
  "Class 12": [
    { topic: "Mathematics", q: "Let R be a relation on the set N of natural numbers defined by nRm if n divides m. Then R is:", options: ["Reflexive and symmetric", "Transitive and symmetric", "Equivalence", "Reflexive, transitive but not symmetric"], ans: 3, exp: "n divides n (reflexive), if n divides m and m divides p, n divides p (transitive). But if n divides m, m doesn't necessarily divide n (not symmetric)." },
    { topic: "Physics", q: "The electric flux through a closed surface enclosing an electric dipole is:", options: ["Infinity", "Zero", "q/ε0", "2q/ε0"], ans: 1, exp: "Net charge enclosed by a dipole (+q and -q) is zero. By Gauss's Law, flux = q_net/ε0 = 0." },
    { topic: "Chemistry", q: "Which of the following forms a virtual and erect image for all positions of the object?", options: ["Concave mirror", "Convex mirror", "Convex lens", "None of these"], ans: 1, exp: "A convex mirror always forms a virtual, erect, and diminished image regardless of the object's position." },
    { topic: "Computer Science", q: "In Python, which of the following is a mutable data type?", options: ["Tuple", "String", "List", "Integer"], ans: 2, exp: "Lists in Python are mutable, meaning their contents can be changed after creation. Tuples, strings, and integers are immutable." },
    { topic: "Mathematics", q: "The derivative of e^(sin x) with respect to x is:", options: ["e^(cos x)", "e^(sin x) cos x", "e^(sin x) sin x", "cos x"], ans: 1, exp: "Using the chain rule: d/dx(e^u) = e^u * du/dx, where u = sin x. Derivative of sin x is cos x. Hence e^(sin x) * cos x." }
  ],
  "Math": [
    { topic: "General Math", q: "What is the value of pi to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], ans: 1, exp: "Pi is approximately 3.14159, which rounds to 3.14 to two decimal places." },
    { topic: "General Math", q: "Solve for x: 2x + 5 = 15", options: ["5", "10", "4", "6"], ans: 0, exp: "2x = 10 => x = 5" },
    { topic: "General Math", q: "What is 15% of 200?", options: ["20", "30", "40", "50"], ans: 1, exp: "(15/100) * 200 = 30" },
    { topic: "General Math", q: "A triangle has angles 90°, 45°, and x. What is x?", options: ["45°", "90°", "30°", "60°"], ans: 0, exp: "Sum of angles is 180. 180 - 90 - 45 = 45." },
    { topic: "General Math", q: "What is the square root of 144?", options: ["10", "11", "12", "14"], ans: 2, exp: "12 * 12 = 144" }
  ],
  "AI": [
    { topic: "General AI", q: "What does 'NLP' stand for in Artificial Intelligence?", options: ["Natural Language Processing", "Neural Logic Programming", "New Linear Programming", "Network Layer Protocol"], ans: 0, exp: "NLP stands for Natural Language Processing, which helps computers understand human language." },
    { topic: "General AI", q: "Which of the following is an example of Unsupervised Learning?", options: ["Classification", "Regression", "Clustering", "Decision Trees"], ans: 2, exp: "Clustering groups unlabeled data, making it a key technique in unsupervised learning." },
    { topic: "General AI", q: "In neural networks, what is the role of an activation function?", options: ["To define the output format", "To introduce non-linearity", "To increase learning rate", "To reduce data size"], ans: 1, exp: "Activation functions introduce non-linear properties to the network, allowing it to learn complex patterns." },
    { topic: "General AI", q: "What is overfitting in Machine Learning?", options: ["When model performs well on test data but poorly on training", "When model performs well on training data but poorly on unseen data", "When the model is too simple", "When training data is too small"], ans: 1, exp: "Overfitting occurs when a model learns the noise in training data instead of general patterns." },
    { topic: "General AI", q: "What algorithm is often used for game playing AI like Chess?", options: ["K-Means", "Minimax", "Linear Regression", "Naive Bayes"], ans: 1, exp: "Minimax is an adversarial search algorithm used widely in two-player turn-based games." }
  ],
  "CS": [
    { topic: "General CS", q: "What does 'HTML' stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Text Management Language", "Home Tool Markup Language"], ans: 0, exp: "HTML is the standard markup language for documents designed to be displayed in a web browser." },
    { topic: "General CS", q: "Which data structure operates on a Last In First Out (LIFO) principle?", options: ["Queue", "Tree", "Stack", "Graph"], ans: 2, exp: "A stack follows the LIFO principle, where the last element added is the first one removed." },
    { topic: "General CS", q: "What is the time complexity of binary search on a sorted array?", options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"], ans: 2, exp: "Binary search cuts the search space in half each iteration, yielding O(log n) time." },
    { topic: "General CS", q: "Which protocol is used for secure communication over the internet?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], ans: 2, exp: "HTTPS uses TLS/SSL to encrypt HTTP requests and responses, ensuring secure communication." },
    { topic: "General CS", q: "What is a primary key in a database?", options: ["A key used to unlock the database", "A unique identifier for a record", "The first column in a table", "A foreign key in another table"], ans: 1, exp: "A primary key uniquely identifies each record in a database table." }
  ]
};

const insertData = async () => {
  try {
    // Clear all questions first so we don't have messy dummy questions
    await Question.deleteMany({});

    const allQuestions = [];
    for (const [subject, questions] of Object.entries(data)) {
      for (const q of questions) {
        allQuestions.push({
          subject: subject,
          topic: q.topic,
          difficulty: "medium",
          questionText: q.q,
          options: q.options,
          correctAnswer: q.ans,
          explanation: q.exp // adding AI explanation
        });
      }
    }

    await Question.insertMany(allQuestions);
    console.log("Database seeded with proper questions and explanations!");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.connection.close();
  }
};

insertData();
