const fs = require('fs');
const file = 'C:/Users/KIIT0001/Adaptive_Learning_Application/backend/controllers/quizController.js';
let content = fs.readFileSync(file, 'utf8');

const replacement = `
exports.startQuiz = async (req, res) => {
  try {
    const { subject, topic, questionCount = 10 } = req.body;

    if (!subject || !topic) {
      return res.status(400).json({
        success: false,
        message: "Subject and Topic are required",
      });
    }

    const attemptedIdsRaw = await Response.find({
      user: req.user.id,
    }).distinct("question");

    const attemptedIds = attemptedIdsRaw
      .map((id) => {
        try {
          return new mongoose.Types.ObjectId(id);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    let needed = Number(questionCount);
    let questions = [];

    // 1. Try to get easy questions first
    let easyQs = await Question.aggregate([
      {
        $match: {
          subject: { $regex: new RegExp('^' + subject + '$', "i") },
          topic: { $regex: new RegExp('^' + topic + '$', "i") },
          difficulty: { $regex: /^easy$/i },
          _id: { $nin: attemptedIds },
        },
      },
      { $sample: { size: needed } },
    ]);

    questions.push(...easyQs);
    needed -= easyQs.length;

    // 2. Fallback to ANY difficulty for the SAME subject & topic
    if (needed > 0) {
      const fetchedIds = questions.map(q => q._id);
      let moreQs = await Question.aggregate([
        {
          $match: {
            subject: { $regex: new RegExp('^' + subject + '$', "i") },
            topic: { $regex: new RegExp('^' + topic + '$', "i") },
            _id: { $nin: [...attemptedIds, ...fetchedIds] },
          },
        },
        { $sample: { size: needed } },
      ]);
      questions.push(...moreQs);
      needed -= moreQs.length;
    }

    // 3. Fallback to SAME subject, ANY topic
    if (needed > 0) {
      const fetchedIds = questions.map(q => q._id);
      let moreQs = await Question.aggregate([
        {
          $match: {
            subject: { $regex: new RegExp('^' + subject + '$', "i") },
            _id: { $nin: [...attemptedIds, ...fetchedIds] },
          },
        },
        { $sample: { size: needed } },
      ]);
      questions.push(...moreQs);
      needed -= moreQs.length;
    }

    // 4. Ultimate fallback to literally any question
    if (needed > 0) {
      const fetchedIds = questions.map(q => q._id);
      let moreQs = await Question.aggregate([
        {
          $match: {
            _id: { $nin: [...attemptedIds, ...fetchedIds] },
          },
        },
        { $sample: { size: needed } },
      ]);
      questions.push(...moreQs);
      needed -= moreQs.length;
    }

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error("Start quiz error:", error);
    res.status(500).json({
      success: false,
      message: "Error starting quiz",
    });
  }
};
`;

content = content.replace(/exports\.startQuiz\s*=\s*async\s*\([^\{]+\{\s*try\s*\{[\s\S]*?res\.status\(500\)\.json\(\{[\s\S]*?\}\);\s*\}\s*\};/, () => replacement.trim());
fs.writeFileSync(file, content, 'utf8');
console.log('Replaced successfully');
