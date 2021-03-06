import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const QuizShow = () => {
  let answerArr;
  const [questions, setQuestions] = useState('');
  const [count, setCount] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');

  // Decode the HTML strings returned from the API's json
  function decodeHtml(html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const handleClick = (correct, choice) => {
    let answer = document.getElementById(choice).innerHTML;
    if (answer === correct) {
      toast.success('Correct!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return setCount((count) => count + 1);
    } else {
      toast.error(`Incorrect! The answer was ${correct}`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Fetch the API
  const fetchQuestions = async () => {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=50&category=9&type=multiple&difficulty=${difficulty}`
    );
    const data = await response.json();
    const mapData = data.results.map(
      (item) => (
        (answerArr = []),
        answerArr.push(
          item.correct_answer,
          item.incorrect_answers[0],
          item.incorrect_answers[1],
          item.incorrect_answers[2]
        ),
        shuffle(answerArr),
        (
          <div className="question-main" key={item.question}>
            <h1>{decodeHtml(item.question)}</h1>
            <div className="answers">
              <button
                className="answer-btn"
                onClick={() => handleClick(item.correct_answer, item.correct_answer)}
              >
                A
              </button>
              <p className="answer-txt" id={item.correct_answer}>
                {decodeHtml(answerArr[0])}
              </p>
              <br />
              <button
                className="answer-btn"
                onClick={() => handleClick(item.correct_answer, item.incorrect_answers[0])}
              >
                B
              </button>
              <p className="answer-txt" id={item.incorrect_answers[0]}>
                {decodeHtml(answerArr[1])}
              </p>
              <br />
              <button
                className="answer-btn"
                onClick={() => handleClick(item.correct_answer, item.incorrect_answers[1])}
              >
                C
              </button>
              <p className="answer-txt" id={item.incorrect_answers[1]}>
                {decodeHtml(answerArr[2])}
              </p>
              <br />
              <button
                className="answer-btn"
                onClick={() => handleClick(item.correct_answer, item.incorrect_answers[2])}
              >
                D
              </button>
              <p className="answer-txt" id={item.incorrect_answers[2]}>
                {decodeHtml(answerArr[3])}
              </p>
            </div>
          </div>
        )
      )
    );
    return setQuestions(mapData);
  };

  useEffect(() => {
    toast.info(`Difficulty set to ${difficulty}`, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, [difficulty]);

  return (
    <div>
      <h1>QUIZ SHOW</h1>
      Choose difficulty:
      <div className="difficulty-btns">
        <button className="easy" onClick={() => setDifficulty('easy')}>
          Easy
        </button>
        <button className="medium" onClick={() => setDifficulty('medium')}>
          Medium
        </button>
        <button className="hard" onClick={() => setDifficulty('hard')}>
          Hard
        </button>
      </div>
      <button className="start-quiz" onClick={() => fetchQuestions()}>
        Start quiz
      </button>
      {questions}
      <h5>Total Score: {count}/50</h5>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default QuizShow;
