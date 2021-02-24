import './App.css';
import React, {useState} from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [isTimeStarted, setIsTimeStarted] = useState(false);
  const [isTimeWaiting, setIsTimeWaiting] = useState(false);
  const [myInterval, setMyInterval] = useState();

  const increment = () => {
    setCounter(prev => prev + 1);
  }

  const start = () => {
    setIsTimeStarted(true);
    setIsTimeWaiting(false);
    setMyInterval(setInterval(increment, 1000));
  }

  const stop = () => {
    clearInterval(myInterval);
    setCounter(0);
    setIsTimeStarted(false);
    setIsTimeWaiting(false);
  }

  const handleStartAndStop = () => {
    if (!isTimeStarted) {
      start();
    } else {
      stop();
    }
  }

  const handleWait = () => {
    if (!isTimeWaiting && isTimeStarted) {
      clearInterval(myInterval);
      setIsTimeWaiting(!isTimeWaiting);
    } 

    if (isTimeWaiting && isTimeStarted) {
      setIsTimeWaiting(!isTimeWaiting);
      start();
    }
  }

  const handleReset = () => {
      setCounter(0);
  }

  const formatToTime = (time) => {
    const seconds = counter % 60;
    const minutes = Math.floor((counter % 3600) / 60);
    const hours = Math.floor(counter / 3600)

    switch (time) {
      case 'seconds':
        return seconds > 9 ? seconds : '0'+seconds;
      case 'minutes': 
        return minutes > 9 ? minutes : '0'+minutes;
      case 'hours': 
        return hours > 9 ? hours : '0'+hours;
      default: break;
    }
  }

  return (
    <>
    <div className="App">
      <div className="timer">
        <h1>{formatToTime('hours')} : {formatToTime('minutes')} : {formatToTime('seconds')}</h1>
        </div>
        <button type="button" onClick={handleStartAndStop}>{isTimeStarted ? 'Stop' : 'Start'}</button>
        <button type="button" onDoubleClick={handleWait}>{isTimeWaiting ? 'Resume' : 'Pause'}</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>
    </>
  );
}

export default App;
