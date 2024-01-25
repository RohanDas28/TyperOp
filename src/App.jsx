import React, { useState, useRef, useEffect } from 'react';
import { getRandomParagraph } from './components/textToType';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [result, setResult] = useState(null);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [textToType, setTextToType] = useState(getRandomParagraph());
  const inputRef = useRef(null);

  useEffect(() => {
    // Update elapsed time every second
    const intervalId = setInterval(() => {
      if (startTime && !isTestCompleted) {
        const now = new Date();
        const elapsed = (now - startTime) / 1000;
        setElapsedTime(elapsed);
      }
    }, 1000);

    // Cleanup interval
    return () => clearInterval(intervalId);
  }, [startTime, isTestCompleted]);

  const handleInputChange = (e) => {
    const { value } = e.target;

    // Start the timer on the first keystroke
    if (!startTime && !isTestCompleted) {
      setStartTime(new Date());
    }

    setInputValue(value);

    // Check if the typed text matches the expected text
    if (value === textToType) {
      const endTime = new Date();
      const timeDiff = endTime - startTime;
      const seconds = timeDiff / 1000;
      const wordsPerMinute = (textToType.split(' ').length / seconds) * 60;

      setResult(`You typed at ${wordsPerMinute.toFixed(2)} words per minute!`);
      setIsTestCompleted(true);
      setInputValue('');
      setStartTime(null);
      setElapsedTime(0);
      inputRef.current.blur();
    }
  };

  const handleRetry = () => {
    // Reset state for a new typing test
    setIsTestCompleted(false);
    setInputValue('');
    setStartTime(null);
    setElapsedTime(0);
    setResult(null);
    setTextToType(getRandomParagraph());
    inputRef.current.focus();
  };

  return (
    <>
      {/* Header Section */}
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center justify-center">
          <a className="flex title-font font-medium items-center text-white md:mb-0">
            <span className="text-2xl">&lt;<span className="text-yellow-400">Typer</span>Op/&gt;</span>
          </a>
          {/* Navigation Section */}
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a target="_blank" href="https://rohandas28.github.io/">
              {/* Github Link Button */}
              <button className="inline-flex items-center bg-yellow-400 border-0 py-2 px-4 focus:outline-none font-semibold text-xl hover:bg-yellow-500 rounded-full text-black mt-2 md:mt-0">
                Github
                <span className="ml-2">
                  {/* Github Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </span>
              </button>
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      <div className="h-[80vh] mx-auto p-8 md:p-24 bg-gray-900 text-white text-center">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Test Title */}
          <h1 className="text-5xl font-bold text-yellow-500 sm:mt-16 md:mt-36 mb-4">Keyboard Speed Test</h1>
          {/* Text to Type */}
          <p className="text-white text-2xl">{textToType}</p>
          {/* Input for Typing */}
          <div className="mt-4">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Start typing..."
              className="border border-yellow-500 p-3 w-full bg-gray-800 text-white rounded-full"
              disabled={isTestCompleted}
            />
          </div>
          {/* Elapsed Time Display */}
          {startTime && (
            <p className="mt-4 text-xl font-bold text-yellow-500">Elapsed Time: {Math.floor(elapsedTime / 60)}:{Math.floor(elapsedTime % 60)}</p>
          )}
          {/* Result Display */}
          {result && <p className="mt-4 text-xl font-bold text-green-500">{result}</p>}
          {/* Retry Button */}
          {isTestCompleted && <button type="button" onClick={handleRetry} className="mt-4 bg-yellow-500 text-gray-900 p-3 rounded">Retry</button>}
        </form>
      </div>



      {/* Footer Section */}
      <footer className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-2 py-3 mx-auto flex items-center justify-center">
          <span className="flex title-font font-medium items-center justify-center text-white flex-col">
            <span className="text-2xl">&lt;<span className="text-yellow-400">Typer</span>Op/&gt;</span>
            {/* Footer Text with Link */}
            <span className="text-2xl text-gray-400 sm:py-2 sm:mt-0 mt-4">
              Created with ❤️ by <a href="https://rohandas.github.io" className="text-yellow-500" target="_blank" rel="noopener noreferrer">Rohan Das</a>
            </span>
          </span>
        </div>
      </footer>
    </>
  );
}

export default App;
