import React, { useState } from 'react';
import { createPortal } from 'react-dom';   // ← NEW
import quizData from './masterAnswer.json';
import './App.css';

function App() {
  const [level, setLevel] = useState('level1');
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [celebration, setCelebration] = useState(false);
  const [celebrationType, setCelebrationType] = useState('');     // "correct" | "incorrect"
  const [levelScores, setLevelScores] = useState({});             // { levelX: score }

  const questions = quizData[level];
  const prettyLevel = `Level ${level.replace('level', '')}`;

  const handleAnswer = (choice) => {
    const correct = choice === questions[current].answer;
    const nextScore = correct ? score + 1 : score;

    setScore(nextScore);
    setCelebrationType(correct ? 'correct' : 'incorrect');
    setCelebration(true);
    setTimeout(() => setCelebration(false), 3000);

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowScore(true);
      setLevelScores((prev) => ({ ...prev, [level]: nextScore }));
    }
  };

  const handleLevelChange = (e) => {
    const newLevel = e.target.value;
    setLevel(newLevel);
    setCurrent(0);
    setScore(0);
    setShowScore(false);
    setCelebration(false);
    setCelebrationType('');
  };

  return (
    <>
      {/* Celebration overlay lives OUTSIDE .App via portal */}
      {celebration &&
        createPortal(
          <div className={`celebration ${celebrationType}`}>
            {celebrationType === 'correct' ? '🎉 Correct! 🎉' : '😞 Incorrect! 😞'}
          </div>,
          document.body
        )}

      <div className="App">
        <header className="App-header">
          <h1>Taj's Flag Quiz</h1>

          <div className="level-select">
            <label htmlFor="level-select">Select Level: </label>
            <select id="level-select" value={level} onChange={handleLevelChange}>
              {Object.keys(quizData).map((lvl) => (
                <option key={lvl} value={lvl}>
                  {`Level ${lvl.replace('level', '')}`}
                </option>
              ))}
            </select>
          </div>

          {showScore ? (
            <div className="score-section">
              You scored {score} of {questions.length} on {prettyLevel}
              {Object.keys(levelScores).length > 0 && (
                <div className="level-summary">
                  <h3>Scoreboard</h3>
                  {Object.entries(levelScores).map(([lvl, sc]) => (
                    <p key={lvl}>
                      Level {lvl.replace('level', '')}: {sc} / {quizData[lvl].length}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="quiz-section">
              <div className="question-section">
                <div className="question-progress">
                  Question {current + 1} of {questions.length}
                </div>
                <img
                  src={`/${questions[current].question}`}
                  alt="flag"
                  className="flag-image"
                />
              </div>
              <div className="answer-section">
                {questions[current].choices.map((choice) => (
                  <button
                    key={choice}
                    onClick={() => handleAnswer(choice)}
                    className="answer-button"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>
      </div>
    </>
  );
}

export default App;
