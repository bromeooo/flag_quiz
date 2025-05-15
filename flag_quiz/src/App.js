import React, { useState } from 'react';
import quizData from './masterAnswer.json';
import './App.css';

function App() {
  const [level, setLevel] = useState('level1');
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [celebration, setCelebration] = useState(false);
  const [celebrationType, setCelebrationType] = useState(''); // "correct" or "incorrect"

  const questions = quizData[level];

  const handleAnswer = (choice) => {
    if (choice === questions[current].answer) {
      setScore(score + 1);
      setCelebrationType('correct');
      setCelebration(true);
      setTimeout(() => setCelebration(false), 3000); 
    } else {
      setCelebrationType('incorrect');
      setCelebration(true);
      setTimeout(() => setCelebration(false), 3000); 
    }

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowScore(true);
    }
  };

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
    setCurrent(0);
    setScore(0);
    setShowScore(false);
    setCelebration(false);
    setCelebrationType('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flag Quiz</h1>

        <div className="level-select">
          <label htmlFor="level-select">Select Level: </label>
          <select
            id="level-select"
            value={level}
            onChange={handleLevelChange}
          >
            {Object.keys(quizData).map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}
          </div>
        ) : (
          <div className="quiz-section">
            <div className="question-section">
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

        {celebration && (
          <div className={`celebration ${celebrationType}`}>
            {celebrationType === 'correct' ? '🎉 Correct! 🎉' : '😞 Incorrect! 😞'}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
