import React, { useState } from 'react';
import ProctoringSystem from './ProctoringSystem';
import './QuizProctoringExample.css';

const QuizProctoringExample = () => {
  const [isExamActive, setIsExamActive] = useState(false);
  const [violations, setViolations] = useState([]);

  // 🔥 NEW STATES
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [examData, setExamData] = useState({
    examId: 'exam_123',
    userId: 'user_456',
    subject: 'Mathematics',
    duration: 3600
  });

  // 🚨 VIOLATION HANDLER
  const handleViolationDetected = (violation) => {
    console.log('🚨 Violation detected:', violation);
    setViolations(prev => [...prev, violation]);

    if (violations.length >= 2) {
      alert('Exam terminated due to multiple violations!');
      setIsExamActive(false);
    }
  };

  const handleSystemReady = () => {
    console.log('✅ Proctoring system ready');
  };

  const handleSystemError = (error) => {
    console.error('❌ Proctoring system error:', error);
  };

  // 🚀 START EXAM (FIXED)
  const startExam = async () => {
    try {
      console.log("🚀 Starting quiz...");

      const res = await fetch("http://localhost:5000/quiz/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // If auth needed:
          // Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          subject: examData.subject,
          topic: "Basics" // 🔥 Change dynamically later
        }),
      });

      const data = await res.json();

      console.log("📦 Quiz Data:", data);

      if (data.success) {
        setQuestions(data.questions); // 🔥 STORE QUESTIONS
        setIsExamActive(true);
      } else {
        alert("Failed to start quiz");
      }

    } catch (error) {
      console.error("Error starting quiz:", error);
    }
  };

  const stopExam = () => {
    setIsExamActive(false);
    console.log('⏹️ Exam stopped');
  };

  // 👉 Current question
  const currentQuestion = questions[currentIndex];

  return (
    <div className="quiz-proctoring-example">
      <div className="exam-header">
        <h1>Online Examination System</h1>
        <div className="exam-info">
          <span className="subject-badge">{examData.subject}</span>
          <span className="duration-badge">
            {Math.floor(examData.duration / 60)} minutes
          </span>
        </div>
      </div>

      <div className="exam-controls">
        {!isExamActive ? (
          <button className="start-exam-btn" onClick={startExam}>
            Start Exam with Proctoring
          </button>
        ) : (
          <button className="stop-exam-btn" onClick={stopExam}>
            Stop Exam
          </button>
        )}
      </div>

      {/* Proctoring System */}
      <ProctoringSystem
        isActive={isExamActive}
        onViolationDetected={handleViolationDetected}
        onSystemReady={handleSystemReady}
        onSystemError={handleSystemError}
        examId={examData.examId}
        userId={examData.userId}
      />

      {/* ✅ QUIZ CONTENT */}
      {isExamActive && currentQuestion && (
        <div className="exam-content">
          <div className="question-panel">
            <h2>Question {currentIndex + 1} of {questions.length}</h2>

            {/* 🔥 DYNAMIC QUESTION */}
            <div className="question-text">
              {currentQuestion.questionText}
            </div>

            {/* 🔥 DYNAMIC OPTIONS */}
            <div className="answer-options">
              {currentQuestion.options?.map((opt, i) => (
                <label key={i} className="option">
                  <input type="radio" name="answer" value={opt} />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {/* 👉 NEXT BUTTON */}
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              disabled={currentIndex >= questions.length - 1}
              className="next-btn"
            >
              Next
            </button>
          </div>

          <div className="exam-sidebar">
            <div className="timer">
              <div className="timer-display">35:42</div>
              <div className="timer-label">Time Remaining</div>
            </div>

            <div className="violation-log">
              <h3>Proctoring Log</h3>
              {violations.length === 0 ? (
                <p className="no-violations">No violations detected</p>
              ) : (
                <div className="violation-list">
                  {violations.map((violation, index) => (
                    <div key={index} className="violation-item">
                      <span className="violation-time">
                        {new Date(violation.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="violation-type">
                        {violation.label} detected
                      </span>
                      <span className="violation-confidence">
                        {(violation.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="exam-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${((currentIndex + 1) / questions.length) * 100}%`
                  }}
                ></div>
              </div>
              <span className="progress-text">
                {currentIndex + 1} / {questions.length} questions
              </span>
            </div>
          </div>
        </div>
      )}

      {/* VIOLATION SUMMARY */}
      {violations.length > 0 && (
        <div className="violation-summary">
          <div className="summary-header">
            <span className="summary-title">Proctoring Summary</span>
            <span className="violation-count">
              {violations.length} violation{violations.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizProctoringExample;