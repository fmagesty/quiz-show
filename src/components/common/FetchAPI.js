import React, { useState } from 'react';

const FetchAPI = async () => {
  const [questao, setQuestao] = useState('');
  const response = await fetch(
    'https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple'
  );
  const responseBody = await response.json();
  console.log(responseBody.results);
  let mapped = responseBody.results.map((key, value) => <p key={key}>{value.question}</p>);
  setQuestao(mapped);

  return <div>{mapped}</div>;
};

export default FetchAPI;
