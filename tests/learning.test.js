const test = require("node:test");
const assert = require("node:assert");

// Helper function tested: calculates course progress
function calculateCourseProgress(totalLessons, completedLessons) {
  if (!totalLessons || totalLessons <= 0) return 0;
  const percentage = Math.round((completedLessons / totalLessons) * 100);
  return Math.min(100, Math.max(0, percentage));
}

// Helper function tested: calculates quiz score and pass status
function gradeQuizAttempt(questions, submittedAnswers, passingScore = 75) {
  if (!questions || questions.length === 0) return { score: 0, passed: false };

  let correctCount = 0;
  for (const q of questions) {
    const studentAns = submittedAnswers[q.id];
    if (studentAns !== undefined && studentAns === q.correctAnswer) {
      correctCount++;
    }
  }

  const score = Math.round((correctCount / questions.length) * 100);
  return {
    score,
    passed: score >= passingScore,
    correctCount,
    totalQuestions: questions.length,
  };
}

// Helper function tested: certificate eligibility
function isEligibleForCertificate(progressPercent, quizPassed = true, assignmentSubmitted = true) {
  return progressPercent >= 100 && quizPassed && assignmentSubmitted;
}

test("Progress Calculation", async (t) => {
  await t.test("should return 0% when no lessons are completed", () => {
    assert.strictEqual(calculateCourseProgress(10, 0), 0);
  });

  await t.test("should return 50% when half lessons are completed", () => {
    assert.strictEqual(calculateCourseProgress(10, 5), 50);
  });

  await t.test("should return 100% when all lessons are completed", () => {
    assert.strictEqual(calculateCourseProgress(12, 12), 100);
  });

  await t.test("should handle division by zero safely", () => {
    assert.strictEqual(calculateCourseProgress(0, 0), 0);
  });
});

test("Quiz Automatic Evaluation Engine", async (t) => {
  const sampleQuestions = [
    { id: "q1", correctAnswer: "1" },
    { id: "q2", correctAnswer: "0" },
    { id: "q3", correctAnswer: "2" },
    { id: "q4", correctAnswer: "3" },
  ];

  await t.test("should award 100% and PASS for perfect answers", () => {
    const answers = { q1: "1", q2: "0", q3: "2", q4: "3" };
    const result = gradeQuizAttempt(sampleQuestions, answers, 75);
    assert.strictEqual(result.score, 100);
    assert.strictEqual(result.passed, true);
    assert.strictEqual(result.correctCount, 4);
  });

  await t.test("should award 75% and PASS at exact threshold", () => {
    const answers = { q1: "1", q2: "0", q3: "2", q4: "wrong" };
    const result = gradeQuizAttempt(sampleQuestions, answers, 75);
    assert.strictEqual(result.score, 75);
    assert.strictEqual(result.passed, true);
    assert.strictEqual(result.correctCount, 3);
  });

  await t.test("should award 50% and FAIL below threshold", () => {
    const answers = { q1: "1", q2: "0", q3: "wrong", q4: "wrong" };
    const result = gradeQuizAttempt(sampleQuestions, answers, 75);
    assert.strictEqual(result.score, 50);
    assert.strictEqual(result.passed, false);
    assert.strictEqual(result.correctCount, 2);
  });
});

test("Certificate Eligibility Verification", async (t) => {
  await t.test("should deny certificate if progress is less than 100%", () => {
    assert.strictEqual(isEligibleForCertificate(95, true, true), false);
  });

  await t.test("should grant certificate if progress is 100% and criteria met", () => {
    assert.strictEqual(isEligibleForCertificate(100, true, true), true);
  });

  await t.test("should deny certificate if mandatory quiz was not passed", () => {
    assert.strictEqual(isEligibleForCertificate(100, false, true), false);
  });
});
