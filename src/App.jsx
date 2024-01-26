import React, { useState, useRef, useEffect } from 'react';
import { GrPowerReset } from "react-icons/gr";
import { getRandomParagraph } from './components/textToType';
import Header from './components/Header';
import Footer from './components/Footer';
import 'animate.css';
import AnimatedCursor from "react-animated-cursor"

function App() {
  const [inputValue, setInputValue] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [result, setResult] = useState(null);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [textToType, setTextToType] = useState(getRandomParagraph());
  const inputRef = useRef(null);
  const [showButton, setShowButton] = useState(false)

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

  const handleFocus = () => {
    console.log('Input field is focused');
    setShowButton(true)
  }

  return (
    <>
      <AnimatedCursor
      innerSize={16}
      outerSize={8}
      color='255, 255, 0'/>
      <Header />
      {/* Main Content Section */}
      <div className="h-[80vh] mx-auto p-8 md:p-24 bg-gray-900 text-white text-center">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Test Title */}
          <h1 className="text-5xl font-bold text-yellow-500 sm:mt-16 md:mt-36 mb-4 animate__animated animate__backInDown">Keyboard Speed Test</h1>
          {/* Text to Type */}
          <p className="text-white text-2xl animate__animated animate__backInUp">{textToType}</p>
          {/* Input for Typing */}
          <div className="mt-4">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Start typing..."
              className="border border-yellow-500 p-3 w-full bg-gray-800 text-white rounded-full animate__animated animate__backInUp"
              disabled={isTestCompleted}
              onFocus={handleFocus}
            />
          </div>
          {/* Elapsed Time Display */}
          {startTime && (
            <p className="mt-4 text-xl font-bold text-yellow-500 animate__animated animate__pulse">Elapsed Time: {Math.floor(elapsedTime / 60)}:{Math.floor(elapsedTime % 60)}</p>
          )}
          {/* Result Display */}
          {result && <p className="mt-4 text-xl font-bold text-green-500 animate__animated animate__tada">{result}</p>}
          {/* Retry Button */}
          {showButton && <div className='flex justify-center items-center animate__animated animate__tada'> <button type="button" onClick={handleRetry} className=" mt-4 flex bg-yellow-400 text-gray-900 px-2 py-2 rounded-full items-center justify-center gap-1 font-semibold hover:bg-yellow-500 hover:scale-105 transition ease-in-out">Retry
            <GrPowerReset />
          </button>
          </div>}
        </form>
      </div>

      <Footer />
    </>
  );
}

export default App;
