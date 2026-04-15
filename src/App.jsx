import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inputTime, setInputTime] = useState({ h: '', m: '', s: '' });
  const timerRef = useRef(null);

  // Sync timeLeft whenever input changes
  useEffect(() => {
    if (!isActive) {
      const total = (Number(inputTime.h) * 3600) + (Number(inputTime.m) * 60) + Number(inputTime.s);
      setTimeLeft(total);
    }
  }, [inputTime, isActive]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      clearInterval(timerRef.current);
      setIsActive(false);
      alert("Time is up!");
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const handleToggle = () => {
    if (timeLeft > 0) setIsActive(!isActive);
    else alert("Please enter a time");
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(0);
    setInputTime({ h: '', m: '', s: '' });
  };

  const format = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return {
      h: String(hrs).padStart(2, '0'),
      m: String(mins).padStart(2, '0'),
      s: String(secs).padStart(2, '0')
    };
  };

  const t = format(timeLeft);

  return (
    <div className="container">
      <div className="timer-card">
        <h2 className="title">Timer</h2>
        
        <div className="display">
          <span>{t.h}</span>:<span>{t.m}</span>:<span>{t.s}</span>
        </div>

        <div className="input-row">
          <input 
            type="number" placeholder="HH" 
            value={inputTime.h} 
            onChange={(e) => setInputTime({...inputTime, h: e.target.value})} 
            disabled={isActive}
          />
          <input 
            type="number" placeholder="MM" 
            value={inputTime.m} 
            onChange={(e) => setInputTime({...inputTime, m: e.target.value})} 
            disabled={isActive}
          />
          <input 
            type="number" placeholder="SS" 
            value={inputTime.s} 
            onChange={(e) => setInputTime({...inputTime, s: e.target.value})} 
            disabled={isActive}
          />
        </div>

        <div className="actions">
          <button className={`main-btn ${isActive ? 'pause' : 'start'}`} onClick={handleToggle}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;