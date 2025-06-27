import { useEffect, useRef } from 'react';
import axios from 'axios';

function Controls({
  journalId,
  startTime,
  targetTime,
  setCurrentTime,
  status,
  setStatus,
  setShowToast,
  setIsSuccess,
  setShowPopup,

}) {
  const timer = useRef(null);

  useEffect(() => {
    if (status === 'running') {
      timer.currentTime = setInterval(() => {
        setCurrentTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer.currentTime);
  }, [status]);

  const handleStop = () => {
    clearInterval(timer.currentTime);
    setStatus('stopped');

    const endTime = new Date().toISOString();

    // 운동 기록 저장
    axios.post(`https://fitlog-server-o04e.onrender.com/${journalId}`, {
      startTime: startTime,
      endTime: endTime,
      goalTime: targetTime,
    }).then((response) => {
      console.log('운동 기록 저장 완료:', response.data);
      if (response.data.data.isCompleted) {
        setIsSuccess(true);
        setShowPopup(true);
      }
    });
  };

  const handleStart = () => {
    if (status === 'idle') {
      setCurrentTime(targetTime);
    }
    setStatus('running');
  };

  const handlePause = () => {
    clearInterval(timer.currentTime);
    setStatus('paused');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleResume = () => {
    setStatus('running');
  };

  return (
    <div className="fitlogButtons">
      {status !== 'running' && <button onClick={handleStart}>Start</button>}
      {status === 'running' && (
        <>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleStop}>Stop</button>
          <button onClick={handleResume}>Resume</button>
        </>
      )}
    </div>
  );
}

export default Controls;