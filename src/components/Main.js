import { useState } from 'react';

function Main() {

  const [names, setNames] = useState(['joe', 'ben', 'alex']);
  const [inputText, setInputText] = useState('');

  function handleTextInput(e) {
    setInputText(e.target.value);
  };

  function addName() {
    setNames(names => [...names, inputText]);
    setInputText('');
  };

  return (<>
    <div>
      {
        names.map((name) => {
          return <div key={name}>{name}</div>
        })
      }
      <input type="text" value={inputText} onChange={handleTextInput} />
      <button onClick={addName}>Add Name</button>
    </div>
  </>);
}

export default Main;
