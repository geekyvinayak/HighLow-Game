import React, { useState, useEffect } from 'react';

const Timer = ({ onTimerEnd, restartTimer }) => {
  const initialSeconds = 10;
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(timer);
          onTimerEnd(); // Call the function in the parent component
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimerEnd]);

  useEffect(() => {
    // Reset the timer when restartTimer changes (i.e., when called from the parent)
    setSeconds(initialSeconds);
  }, [restartTimer, initialSeconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div>
      <h1>Timer</h1>
      <p>
        {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
      </p>
    </div>
  );
};

export default Timer;
