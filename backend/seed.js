const mongoose = require("mongoose");
const Question = require("./models/Question");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/adaptive-learning");

const seedData = [
  // JEE
  {
    subject: "JEE",
    topic: "Physics",
    difficulty: "hard",
    questionText: "A particle of mass m is projected with velocity v making an angle of 45° with the horizontal. The magnitude of the angular momentum of the particle about the point of projection when the particle is at its maximum height is (where g = acceleration due to gravity)",
    options: ["Zero", "mv^3 / (4√2 g)", "mv^3 / (√2 g)", "mv^2 / (2g)"],
    correctAnswer: 1
  },
  {
    subject: "JEE",
    topic: "Physics",
    difficulty: "medium",
    questionText: "Two identical capacitors, have the same capacitance C. One of them is charged to potential V1 and the other to V2. The negative ends of the capacitors are connected together. When the positive ends are also connected, the decrease in energy of the combined system is",
    options: ["1/4 C(V1^2 - V2^2)", "1/4 C(V1^2 + V2^2)", "1/4 C(V1 - V2)^2", "1/4 C(V1 + V2)^2"],
    correctAnswer: 2
  },
  {
    subject: "JEE",
    topic: "Mathematics",
    difficulty: "hard",
    questionText: "If the roots of the equation x^3 - 12x^2 + 39x - 28 = 0 are in A.P., then their common difference is",
    options: ["±1", "±2", "±3", "±4"],
    correctAnswer: 2
  },
  
  // NEET
  {
    subject: "NEET",
    topic: "Biology",
    difficulty: "medium",
    questionText: "Which of the following is responsible for peat formation?",
    options: ["Marchantia", "Riccia", "Funaria", "Sphagnum"],
    correctAnswer: 3
  },
  {
    subject: "NEET",
    topic: "Biology",
    difficulty: "easy",
    questionText: "The basic functional unit of the human kidney is",
    options: ["Nephron", "Nephridium", "Henle's loop", "Glomerulus"],
    correctAnswer: 0
  },
  {
    subject: "NEET",
    topic: "Chemistry",
    difficulty: "medium",
    questionText: "The correct order of electronegativity of N, O, F and C is",
    options: ["F > O > N > C", "F > N > O > C", "C > N > O > F", "O > F > N > C"],
    correctAnswer: 0
  },

  // Class 12
  {
    subject: "Class 12",
    topic: "Computer Science",
    difficulty: "medium",
    questionText: "In SQL, which command is used to remove a table from the database?",
    options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"],
    correctAnswer: 1
  },
  {
    subject: "Class 12",
    topic: "Mathematics",
    difficulty: "easy",
    questionText: "The derivative of sin(x) with respect to x is:",
    options: ["-cos(x)", "cos(x)", "tan(x)", "-sin(x)"],
    correctAnswer: 1
  },

  // Class 10
  {
    subject: "Class 10",
    topic: "Science",
    difficulty: "easy",
    questionText: "The image formed by a plane mirror is always:",
    options: ["Virtual and Erect", "Real and Erect", "Virtual and Inverted", "Real and Inverted"],
    correctAnswer: 0
  },
  {
    subject: "Class 10",
    topic: "Mathematics",
    difficulty: "medium",
    questionText: "The sum of the roots of the quadratic equation ax^2 + bx + c = 0 is:",
    options: ["c/a", "-c/a", "b/a", "-b/a"],
    correctAnswer: 3
  }
];

const seedDB = async () => {
  try {
    await Question.insertMany(seedData);
    console.log("Database seeded successfully with JEE, NEET, Class 10, Class 12 questions!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
