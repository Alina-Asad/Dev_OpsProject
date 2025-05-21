import React from 'react';
import './style.css';

function App() {
  const [number1, setNumber1] = React.useState('');
  const [number2, setNumber2] = React.useState('');

  return (
    <div>
      <input value={number1} onChange={event => setNumber1(event.target.value)} />
      <span>+</span>
      <input value={number2} onChange={event => setNumber2(event.target.value)} />
      <span>=</span>
      <span>{Number(number1) + Number(number2)}</span>
    </div>
  );
}

export default App;