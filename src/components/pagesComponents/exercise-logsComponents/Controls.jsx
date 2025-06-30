import React from "react";
import styles from "../../../css/ExerciseLogs.module.css";

const Controls = ({
  time,
  isRunning,
  startTimer,
  stopTimer,
  resetTimer,
}) => (
  <div className={styles.controlsContainer}>
    <button
      className={styles['pause-button']}
      onClick={stopTimer}
      disabled={!isRunning}
      aria-label="일시정지"
    >
      <span style={{ fontSize: '18px' }}>⏸</span>
    </button>
    {time < 0 ? (
      <button
        className={`${styles['start-button']} ${styles.overtime}`}
        onClick={resetTimer}
      >
        <span className={styles['stop-icon']} role="img" aria-label="정지" style={{ fontSize: '24px', marginRight: '10px', verticalAlign: 'middle' }}>⏹️</span>
        Stop!
      </button>
    ) : (
      <button
        className={`${styles['start-button']}${isRunning ? ' ' + styles.running : ''}`}
        onClick={startTimer}
        disabled={isRunning && time > 0}
      >
        <span className={styles['play-icon']}>▶</span> Start!
      </button>
    )}
    <button
      className={styles['pause-button']}
      onClick={resetTimer}
      disabled={isRunning}
      aria-label="리셋"
    >
      <span style={{ fontSize: '18px' }}>&#8635;</span>
    </button>
  </div>
);

export default Controls;