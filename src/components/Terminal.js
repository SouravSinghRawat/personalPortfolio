import React, { useState, useEffect, useRef } from 'react';
import '../style/Terminal.css';

const Terminal = () => {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [currentOutput, setCurrentOutput] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef(null); // Ref to track the terminal container
  const inputRef = useRef(null); // Ref to track the input field

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const command = inputValue.trim().toLowerCase();
    const output = processCommand(command);
    setInputValue('');

    if (command !== 'clr') {
      setHistory((prevHistory) => [...prevHistory, { command, output: [] }]);
      typeEffect(output);
    } else {
      setHistory([]);
    }
  };

  const processCommand = (command) => {
    switch (command) {
      case 'help':
        return (
          <>
            'desc' for description.<br />'proj' for projects.<br />'resm' for resume link.<br />'conct' for contact
            Details.<br />'clr' for clear Screen.
          </>
        );
      case 'desc':
        return <>I'm an Engineering student looking for the opportunities to enhance my skills and explore my domain.</>;
      case 'proj':
        return (
          <>
            <a href="https://example.com/" target="_blank" rel="noopener noreferrer">Weather Broadcast...</a><br />
            <a href="https://example.com/" target="_blank" rel="noopener noreferrer">Resume Generator...</a><br />
            <a href="https://example.com/" target="_blank" rel="noopener noreferrer">Flappy Bird prototype...</a><br />
            <a href="https://example.com/" target="_blank" rel="noopener noreferrer">Personal Portfolio you are looking at!!</a><br />
            <a href="https://example.com/" target="_blank" rel="noopener noreferrer">E-Commerce...</a><br />
            <a href="https://example.com/" target="_blank" rel="noopener noreferrer">Graph Algorithm Visualizer...</a><br />
            <a href="https://example.com/" target="_blank" rel="noopener noreferrer">File Sharing Website...</a>
          </>
        );
      case 'resm':
        return <>Link to my Resume</>;
      case 'conct':
        return (
          <>
            <a href="mailto:souravrawat959@gmail.com">souravrawat959@gmail.com</a><br />
            Mob. no.: +91 7248746306<br/>
            <a href="https://example.com/" target="_blank" rel="noopener noreferrer">LinkedIn Profile Link...</a>
          </>
        );
      case 'clr':
        return '';
      default:
        return 'Command not recognized. Type "help" for available commands.';
    }
  };

  const typeEffect = (text) => {
    setIsTyping(true);
    const lines = getLines(text);
    let lineIndex = 0;
    let charIndex = 0;
    const speed = 15; // Adjust speed of typing in milliseconds

    const typeWriter = () => {
      if (lineIndex < lines.length) {
        if (charIndex < lines[lineIndex].length) {
          const char = lines[lineIndex].charAt(charIndex);
          setCurrentOutput((prev) => [...prev, char]);
          charIndex++;
          setTimeout(typeWriter, speed);
        } else {
          setCurrentOutput((prev) => [...prev, <br key={lineIndex} />]);
          charIndex = 0;
          lineIndex++;
          setTimeout(typeWriter, speed);
        }
      } else {
        setHistory((prevHistory) => [
          ...prevHistory.slice(0, -1),
          { ...prevHistory[prevHistory.length - 1], output: text }
        ]);
        setCurrentOutput([]);
        setIsTyping(false);
      }
    };

    setCurrentOutput([]); // Reset current output before starting the effect
    typeWriter();
  };

  const getLines = (element) => {
    if (typeof element === 'string') {
      return element.split(/<br\s*\/?>/gi);
    }
    if (Array.isArray(element)) {
      return element.map(getLines).flat();
    }
    if (element.props && element.props.children) {
      return getLines(element.props.children);
    }
    return [];
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    inputRef.current?.focus();
  }, [history, currentOutput]);

  return (
    <div className='terminal' ref={terminalRef}>
      <p id="des">Welcome to my interactive web terminal.<br/>For a list of available commands type <span id="com">'help'</span></p>
      <p>SouravSinghRawat@personal-portfolio REACT</p>
      <form onSubmit={handleFormSubmit}>
        {history.map((entry, index) => (
          <React.Fragment key={index}>
            <div className='command'>{entry.command}</div>
            <div className='output'>{entry.output}</div>
            <p>SouravSinghRawat@personal-portfolio REACT</p>
          </React.Fragment>
          
        ))}
        
        <div className='output'>
          {currentOutput.map((item, index) => (
            <React.Fragment key={index}>{item}</React.Fragment>
          ))}
        </div>
        <input
          autoFocus
          type='text'
          className='transparent-input'
          value={inputValue}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <span className='input-cursor'></span>
      </form>
    </div>
  );
};

export default Terminal;