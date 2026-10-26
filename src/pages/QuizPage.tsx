import { useState } from "react";

const QUESTIONS = [
  {
    question: "Which movie features Peter Parker as Spider-Man?",
    options: ["The Odyssey", "Spider-Man", "Moana", "John Wick: Chapter 4"],
    answer: "Spider-Man",
  },
  {
    question: "Which movie is about King Odysseus?",
    options: [
      "The Odyssey",
      "Supergirl",
      "Toy Story 5",
      "Avatar: The Way of Water",
    ],
    answer: "The Odyssey",
  },
  {
    question: "Which movie features Woody and Buzz?",
    options: ["Moana", "Toy Story 5", "Spider-Man", "The Last House"],
    answer: "Toy Story 5",
  },
  {
    question: "Which movie stars John Wick?",
    options: ["John Wick: Chapter 4", "Supergirl", "Colony", "Disclosure Day"],
    answer: "John Wick: Chapter 4",
  },
  {
    question: "Which movie features Moana?",
    options: [
      "Moana",
      "The Devil's Mouth",
      "Backrooms",
      "Spider-Man: Homecoming",
    ],
    answer: "Moana",
  },
];

function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[currentQuestion];

  function handleAnswer(answer: string) {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answer === question.answer) {
      setScore((previous) => previous + 1);
    }
  }

  function handleNext() {
    if (currentQuestion === QUESTIONS.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentQuestion((previous) => previous + 1);
    setSelectedAnswer("");
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer("");
    setFinished(false);
  }

  if (finished) {
    return (
      <main className="main-container">
        <section className="quiz-container">
          <h1>Movie Quiz</h1>
          <h2>
            Your score: {score} / {QUESTIONS.length}
          </h2>

          <p>
            {score === QUESTIONS.length
              ? "Perfect score!"
              : score >= 3
                ? "Great job!"
                : "Keep watching more movies and try again!"}
          </p>

          <button className="btn-primary" onClick={restartQuiz}>
            Play Again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="main-container">
      <section className="quiz-container">
        <h1>Movie Quiz</h1>

        <p>
          Question {currentQuestion + 1} of {QUESTIONS.length}
        </p>

        <h2>{question.question}</h2>

        <div className="quiz-options">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.answer;

            let className = "btn-secondary";

            if (selectedAnswer) {
              if (isCorrect) {
                className = "btn-primary";
              } else if (isSelected) {
                className = "btn-secondary";
              }
            }

            return (
              <button
                key={option}
                className={className}
                onClick={() => handleAnswer(option)}
                disabled={Boolean(selectedAnswer)}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selectedAnswer && (
          <button className="btn-primary" onClick={handleNext}>
            {currentQuestion === QUESTIONS.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        )}
      </section>
    </main>
  );
}

export default QuizPage;
