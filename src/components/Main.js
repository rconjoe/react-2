import { useState, useEffect } from 'react';
import axios from 'axios';

function Main() {

  const [names, setNames] = useState(['joe', 'ben', 'alex']);
  const [inputText, setInputText] = useState('');

  function handleTextInput(e) {
    setInputText(e.target.value);
  };

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get('http://localhost:8000/users');
      console.log(response)
      return response
    }
    fetchUsers();
  }, [])



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
