import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import styles from '../css/ExerciseLogs.module.css';
import { Header } from '../components/commonComponents/Header/index.jsx';
import { PointDisplay } from '../components/pagesComponents/journalsComponents/PointDisplay/index.jsx';
import { getExercisePointByJournalId, updateExercisePointByJournalId } from '../api/exerciseLogs/exerciseLogsApi';
import IcPoint from '../assets/icons/ic_point.svg';

// PointsSection 컴포넌트
const PointsSection = ({ exercisePoints }) => (
  <div style={{ marginBottom: 16 }}>
    <p style={{ margin: 0, fontWeight: 500, fontSize: 15, color: '#444', marginBottom: 10 }}>
      현재까지 획득한 포인트
    </p>
    <div
      className={styles['points-section']}
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: 20,
        padding: '8px 18px',
        background: '#F0F4FA',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.03)',
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        gap: 8,
      }}
    >
      <img src={IcPoint} alt="포인트" style={{ width: 20, height: 20, verticalAlign: 'middle' }} />
      <span style={{ fontSize: 14, fontWeight: 150, color: '#5D6A7F' }}>{exercisePoints}</span>
      <span style={{ fontSize: 14, color: '#666' }}>P 획득</span>
    </div>
  </div>
);

// TimerDisplay: 숫자만 보여줌
const TimerDisplay = ({ time, isWarning, isNegative }) => {
  const minutes = String(Math.floor(Math.abs(time) / 60)).padStart(2, '0');
  const seconds = String(Math.abs(time) % 60).padStart(2, '0');
  let colorClass = styles['timer-normal'];
  if (isNegative) colorClass = styles['timer-negative'];
  else if (isWarning) colorClass = styles['timer-warning'];

  return (
    <div className={`${styles['timer-display']} ${colorClass}`}>
      {isNegative && <span className={styles['timer-negative-dash']}>-</span>}
      {minutes}:{seconds}
    </div>
  );
};

// Controls 컴포넌트
const Controls = ({
  time,
  isRunning,
  startTimer,
  stopTimer,
  resetTimer,
}) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0' }}>
    <button
      className={styles['pause-button']}
      onClick={stopTimer}
      disabled={!isRunning}
      aria-label="일시정지"
    >
      <span style={{ fontSize: '22px' }}>⏸</span>
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
      <span style={{ fontSize: '22px' }}>&#8635;</span>
    </button>
  </div>
);

// Toast 컴포넌트
const Toast = ({ toast, successToast, getToastPoint }) => (
  <>
    {toast && (
      <div className={styles['toast-popup']}>
        <span style={{ fontSize: '22px', marginRight: '8px', verticalAlign: 'middle' }} role="img" aria-label="경광등">🚨</span>
        집중이 중단되었습니다
      </div>
    )}
    {successToast && getToastPoint() > 0 && (
      <div className={`${styles['toast-popup']} ${styles.success}`}>
        <span style={{ fontSize: '22px', marginRight: '8px', verticalAlign: 'middle' }} role="img" aria-label="트로피">🏆</span>
        집중 성공! 포인트를 획득했습니다
        <span style={{ marginLeft: '18px', fontSize: '18px', color: '#388e3c', fontWeight: 700 }}>
          +{getToastPoint()}P
        </span>
      </div>
    )}
  </>
);

export const ExerciseLogs = () => {
  const { journalId, nickname } = useParams();
  const [time, setTime] = useState(25 * 60);
  const [inputMinutes, setInputMinutes] = useState(25);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showTimerSetting, setShowTimerSetting] = useState(false);
  const [toast, setToast] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const isSuccessRef = useRef(false);
  const timerRef = useRef(null);
  const prevTimeRef = useRef();
  const [initialMinutes, setInitialMinutes] = useState(25);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [exercisePoints, setExercisePoints] = useState(0);

  const navigate = useNavigate();

  // 서버에서 포인트 불러오기
  useEffect(() => {
    if (journalId) {
      getExercisePointByJournalId(journalId)
        .then((exercisePoint) => setExercisePoints(exercisePoint))
        .catch(() => setExercisePoints(0));
    }
  }, [journalId]);

  // 타이머 컨트롤
  const startTimer = () => {
    if (!isRunning && time > 0) {
      isSuccessRef.current = false;
    }
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
  };
  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setToast(true);
    setTimeout(() => setToast(false), 1800);
  };
  const resetTimer = () => {
    setTime(initialMinutes * 60 + initialSeconds);
    setInputMinutes(initialMinutes);
    setInputSeconds(initialSeconds);
    setIsRunning(false);
    isSuccessRef.current = false;
    clearInterval(timerRef.current);
  };

  // 타이머 설정 저장
  const handleSaveTimerSetting = () => {
    const total = inputMinutes * 60 + inputSeconds;
    setTime(total > 0 ? total : 1);
    setInitialMinutes(inputMinutes);
    setInitialSeconds(inputSeconds);
    setShowTimerSetting(false);
    isSuccessRef.current = false;
  };

  // 타이머 설정 취소
  const handleCancelTimerSetting = () => {
    setInputMinutes(initialMinutes);
    setInputSeconds(initialSeconds);
    setShowTimerSetting(false);
  };

  // 포인트 계산 함수
  const getToastPoint = () => {
    const totalSetSec = initialMinutes * 60 + initialSeconds;
    if (totalSetSec === 0) return 0;
    if (time === 0) {
      return 3 + Math.floor(totalSetSec / 600);
    } else if (time < 0) {
      return 0;
    } else {
      return Math.floor(totalSetSec / 600);
    }
  };

  // input 동기화
  useEffect(() => {
    setInputMinutes(Math.floor(time / 60));
    setInputSeconds(time % 60);
  }, [time]);

  // 성공 토스트 1회만 표시 + 서버에 포인트 반영
  useEffect(() => {
    if (
      prevTimeRef.current !== undefined &&
      prevTimeRef.current === 1 &&
      time === 0 &&
      !isSuccessRef.current &&
      getToastPoint() > 0
    ) {
      setSuccessToast(true);
      isSuccessRef.current = true;
      setTimeout(() => setSuccessToast(false), 2000);

      // 클라이언트 포인트 증가
      setExercisePoints((prev) => {
        const newPoints = prev + getToastPoint();
        // 서버에 포인트 반영
        if (journalId) {
          updateExercisePointByJournalId(journalId, newPoints).catch(() => {});
        }
        return newPoints;
      });
    }
    prevTimeRef.current = time;
  }, [time, journalId]);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  // 타이머 경고/음수 상태
  const isWarning = time <= 10 && time > 0;
  const isNegative = time < 0;

  // 숫자 부분만 인풋으로 바뀌는 타이머 설정 버튼
  const [editingField, setEditingField] = useState(null); // 'minutes' or 'seconds'

  const renderTimerSetButton = () => (
    <button
      className={styles['timer-set-btn']}
      type="button"
      onClick={() => {
        if (!showTimerSetting) {
          setShowTimerSetting(true);
          setEditingField('minutes');
        }
      }}
      tabIndex={0}
    >
      <span className={styles['timer-set-icon']} role="img" aria-label="타이머">🕒</span>
      {showTimerSetting ? (
        <>
          <input
            type="number"
            min="0"
            max="180"
            value={inputMinutes}
            onChange={e => setInputMinutes(Math.max(0, Math.min(180, Number(e.target.value) || 0)))}
            className={styles['timer-set-input']}
            style={{ width: 48, textAlign: 'right' }}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSaveTimerSetting();
              if (e.key === 'Escape') handleCancelTimerSetting();
              if (e.key === ':' || e.key === 'Tab') setEditingField('seconds');
            }}
            autoFocus={editingField === 'minutes'}
            onMouseDown={e => e.stopPropagation()}
            onClick={e => setEditingField('minutes')}
          />
          :
          <input
            type="number"
            min="0"
            max="59"
            value={inputSeconds}
            onChange={e => setInputSeconds(Math.max(0, Math.min(59, Number(e.target.value) || 0)))}
            className={styles['timer-set-input']}
            style={{ width: 48, textAlign: 'right' }}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSaveTimerSetting();
              if (e.key === 'Escape') handleCancelTimerSetting();
              if (e.key === 'Tab') setEditingField('minutes');
            }}
            autoFocus={editingField === 'seconds'}
            onMouseDown={e => e.stopPropagation()}
            onClick={e => setEditingField('seconds')}
          />
        </>
      ) : (
        <>
          {String(initialMinutes).padStart(2, '0')}:{String(initialSeconds).padStart(2, '0')}
        </>
      )}
    </button>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f0f4fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div className={styles['app-container']} style={{ paddingTop: 78 }}>
        <Header />
        <header className={styles.header}>
          <h1>
            <span style={{ color: '#59739C' }}>{nickname}</span>의 운동일지
            </h1>
          <div className={styles['header-right']}>
            <button
              className={styles['icon-button']}
              onClick={() => navigate(`/routines/${journalId}`)}
            >
              오늘의 습관 {'>'}
            </button>
            <button
              className={styles['icon-button']}
              onClick={() => navigate('/')}
            >
              홈 {'>'}
            </button>
          </div>
        </header>

        <PointsSection exercisePoints={exercisePoints} />

        <div className={styles['focus-timer-card']}>
          <p className={styles['card-title']}>오늘의 집중</p>
          {renderTimerSetButton()}
          <TimerDisplay time={time} isWarning={isWarning} isNegative={isNegative} />
          <Controls
            time={time}
            isRunning={isRunning}
            startTimer={startTimer}
            stopTimer={stopTimer}
            resetTimer={resetTimer}
          />
        </div>

        <Toast toast={toast} successToast={successToast} getToastPoint={getToastPoint} />
      </div>
    </div>
  );
};