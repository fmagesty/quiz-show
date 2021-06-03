import React, { useState } from 'react';

const QuizShow = () => {
  const [question, setQuestion] = useState('');

  // Decode the HTML strings returned from the API's json
  function decodeHtml(html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
  // Fetch the API
  const fetchQuestions = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=50&category=9&type=multiple');
    const data = await response.json();
    const mapData = data.results.map((item) => (
      <div key={item.question}>
        <h1>{decodeHtml(item.question)}</h1>
        <button>A</button>
        {decodeHtml(item.correct_answer)}
        <button>B</button>
        {decodeHtml(item.incorrect_answers[0])}
        <br />
        <button>C</button>
        {decodeHtml(item.incorrect_answers[1])}
        <button>D</button>
        {decodeHtml(item.incorrect_answers[2])}
      </div>
    ));
    return setQuestion(mapData);
  };

  return (
    <div>
      <h1>QUIZ SHOW</h1>
      <button onClick={() => fetchQuestions()}>Start quiz</button>
      <div>{question}</div>
    </div>
  );
};

export default QuizShow;
