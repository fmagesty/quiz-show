import React, { useState, useEffect } from 'react';

const QuizShow = () => {
  let answerArr;
  const [questions, setQuestions] = useState('');

  // Decode the HTML strings returned from the API's json
  function decodeHtml(html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
  function shuffle(array) {
    var currentIndex = array.length,
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

  const handleClick = (props) => {
    console.log(props);
  };

  // Fetch the API
  const fetchQuestions = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=50&category=9&type=multiple');
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
              <button onClick={() => handleClick(item.correct_answer)}>A</button>
              <p>{decodeHtml(answerArr[0])}</p>
              <br />
              <button>B</button>
              <p id="b">{decodeHtml(answerArr[1])}</p>
              <br />
              <button>C</button>
              <p id="c">{decodeHtml(answerArr[2])}</p>
              <br />
              <button>D</button>
              <p id="d">{decodeHtml(answerArr[3])}</p>
            </div>
          </div>
        )
      )
    );
    return setQuestions(mapData);
  };

  return (
    <div>
      <h1>QUIZ SHOW</h1>
      <button className="start-quiz" onClick={() => fetchQuestions()}>
        Start quiz
      </button>
      <ul>
        <h4>TODO:</h4>
        <li>add option to choose difficulty/theme/etc</li>
        <li> keep track os the player's score</li>
        <li>notification when a button is clicked (correct/incorrect)</li>
      </ul>
      {questions}
    </div>
  );
};

export default QuizShow;
