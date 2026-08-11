const mongoose = require("mongoose");
const Question = require("./models/Question");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/adaptive-learning");

const oldSubjects = ["Math", "Physics", "Chemistry", "Biology", "AI", "CS", "English", "CN", "OS", "DBMS", "SE"];
const seedData = oldSubjects.map(sub => ({
  subject: sub,
  topic: "General " + sub,
  difficulty: "medium",
  questionText: `This is a sample question for ${sub}.`,
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: 0
}));

const seedDB = async () => {
  try {
    await Question.insertMany(seedData);
    console.log("Database seeded successfully with all the old subjects!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
