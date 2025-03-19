import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import './App.scss';

function App() {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <div className="title">Speech to Text</div>
        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Your speech will appear here..."
            className="input"
          />
          <button
            onClick={startListening}
            className={`mic-button ${isListening ? 'listening' : ''}`}
          >
            {isListening ? <MicOff /> : <Mic />}
          </button>
        </div>
        <p className="status">
          {isListening ? 'Listening...' : 'Click the microphone to start speaking'}
        </p>
      </div>
    </div>
  );
}

export default App;
