import React, { useState } from 'react';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);

  const handleInput = (event) => {
    if (event.key === 'Enter') {
      executeCommand(input.trim());
      setInput('');
    }
  };

  const executeCommand = (command) => {
    let response = '';

    switch (command.toLowerCase()) {
      case 'help':
        response = '- greet\n- time \n- date\n- clear\n- help';
        break;
      case 'greet':
        response = 'Hello there!';
        break;
      case 'time':
        response = new Date().getTime();
        break;
      case 'date':
        response = new Date().toLocaleDateString();
        break;
      case 'clear':
        setOutput([]);
        return;
      default:
        response = `Command not found: ${command}`;
    }

    setOutput((prevOutput) => [
      ...prevOutput,
      { command: command, response: response },
    ]);
  };

  return (
    <div id="terminal">
      {output.map((item, index) => (
        <div key={index} className="output">
          <pre>{`> ${item.command}`}</pre>
          <pre>{item.response}</pre>
        </div>
      ))}
      <div id="input">
        <input
          className="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInput}
        />
      </div>
    </div>
  );
};