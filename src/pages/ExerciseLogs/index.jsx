import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ExerciseLogs.module.css";
import { Header } from "../../components/commonComponents/Header/index.jsx";
import { PointDisplay } from "../../components/pagesComponents/journalsComponents/PointDisplay/index.jsx";
import {
  getExercisePointByJournalId,
  createExerciseLogAPI,
} from "../../api/exerciseLogs/exerciseLogsApi.js";
import { getJournalByJournalId } from "../../api/journals/journalsApi.js";
// import IcPoint from "../../assets/icons/ic_point.svg"; // Not used directly in JSX, can be removed if not needed elsewhere

// PointsSection 컴포넌트: 현재까지 획득한 포인트를 표시합니다.
const PointsSection = ({ exercisePoints }) => (
  <div style={{ marginBottom: 16 }}>
    <p
      style={{
        margin: 0,
        fontWeight: 500,
        fontSize: 15,
        color: "#444",
        marginBottom: 10,
      }}
    >
      현재까지 획득한 포인트
    </p>
    <PointDisplay emoji="💪" value={exercisePoints} unit="P" />{" "}
  </div>
);

// TimerDisplay: 타이머 시간을 표시합니다. 경고 및 음수 시간에 따라 색상이 변경됩니다.
const TimerDisplay = ({ time, isWarning, isNegative }) => {
  const minutes = String(Math.floor(Math.abs(time) / 60)).padStart(2, "0");
  const seconds = String(Math.abs(time) % 60).padStart(2, "0");
  let colorClass = styles["timer-normal"];
  if (isNegative) colorClass = styles["timer-negative"];
  else if (isWarning) colorClass = styles["timer-warning"];

  return (
    <div className={`${styles["timer-display"]} ${colorClass}`}>
      {isNegative && <span className={styles["timer-negative-dash"]}>-</span>}
      {minutes}:{seconds}
    </div>
  );
};

// Controls 컴포넌트: 타이머 시작, 일시정지, 리셋 버튼을 제공합니다.
const Controls = ({ time, isRunning, startTimer, stopTimer, resetTimer }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0",
    }}
  >
    <button
      className={styles["pause-button"]}
      onClick={stopTimer}
      disabled={!isRunning}
      aria-label="일시정지"
    >
      <span style={{ fontSize: "22px" }}>⏸</span>
    </button>
    {time < 0 ? ( // 시간이 음수일 때 (초과 시간) "Stop!" 버튼 표시
      <button
        className={`${styles["start-button"]} ${styles.overtime}`}
        onClick={stopTimer} // ⭐ 변경: 초과 시간일 때도 stopTimer 호출 (포인트 계산 및 기록 위함)
        disabled={!isRunning} // ⭐ 추가: 타이머가 실행 중이 아닐 때 버튼 비활성화
      >
        <span
          className={styles["stop-icon"]}
          role="img"
          aria-label="정지"
          style={{
            fontSize: "24px",
            marginRight: "10px",
            verticalAlign: "middle",
          }}
        >
          ⏹️
        </span>
        Stop!
      </button>
    ) : (
      // 시간이 0 이상일 때 "Start!" 버튼 표시
      <button
        className={`${styles["start-button"]}${
          isRunning ? " " + styles.running : ""
        }`}
        onClick={startTimer}
        disabled={isRunning && time > 0} // 타이머가 실행 중이고 시간이 0보다 크면 비활성화
      >
        <span className={styles["play-icon"]}>▶</span> Start!
      </button>
    )}
    <button
      className={styles["pause-button"]}
      onClick={resetTimer}
      disabled={isRunning} // 타이머가 실행 중일 때는 리셋 버튼 비활성화
      aria-label="리셋"
    >
      <span style={{ fontSize: "22px" }}>&#8635;</span>
    </button>
  </div>
);

// Toast 컴포넌트: 타이머 중단 또는 성공 메시지를 팝업으로 표시합니다.
const Toast = ({ toast, successToast, getToastPoint }) => (
  <>
    {toast && ( // 일반 중단 토스트 (포인트 미획득 시)
      <div className={styles["toast-popup"]}>
        <span
          style={{
            fontSize: "22px",
            marginRight: "8px",
            verticalAlign: "middle",
          }}
          role="img"
          aria-label="경광등"
        >
          🚨
        </span>
        타이머가 일시 정지되었습니다 {/* ⭐ 변경: 메시지 문구 수정 */}
      </div>
    )}
    {successToast &&
      getToastPoint() > 0 && ( // 성공 토스트 (포인트 획득 시)
        <div className={`${styles["toast-popup"]} ${styles.success}`}>
          <span
            style={{
              fontSize: "22px",
              marginRight: "8px",
              verticalAlign: "middle",
            }}
            role="img"
            aria-label="트로피"
          >
            🏆
          </span>
          집중 성공! 포인트를 획득했습니다
          <span
            style={{
              marginLeft: "18px",
              fontSize: "18px",
              color: "#388e3c",
              fontWeight: 700,
            }}
          >
            +{getToastPoint()}P
          </span>
        </div>
      )}
  </>
);

// --- 메인 컴포넌트 ---
export const ExerciseLogs = () => {
  const { journalId } = useParams();
  const [time, setTime] = useState(25 * 60); // 현재 타이머 시간 (초)
  const [inputMinutes, setInputMinutes] = useState(25); // 설정 입력 필드 (분)
  const [inputSeconds, setInputSeconds] = useState(0); // 설정 입력 필드 (초)
  const [isRunning, setIsRunning] = useState(false); // 타이머 실행 상태
  const [showTimerSetting, setShowTimerSetting] = useState(false); // 타이머 설정 UI 표시 여부
  const [toast, setToast] = useState(false); // 중단 토스트 표시 여부
  const [successToast, setSuccessToast] = useState(false); // 성공 토스트 표시 여부
  const timerRef = useRef(null); // setInterval 참조
  const [initialMinutes, setInitialMinutes] = useState(25); // 초기 설정 분
  const [initialSeconds, setInitialSeconds] = useState(0); // 초기 설정 초
  const [exercisePoints, setExercisePoints] = useState(0); // 현재까지 획득한 총 포인트

  // 저널 상세 정보 상태 (닉네임 등을 가져오기 위함)
  const [journalDetails, setJournalDetails] = useState(null);

  const navigate = useNavigate();

  // 저널 상세 정보 가져오기 (닉네임 표시용)
  const fetchJournalDetails = useCallback(async () => {
    if (!journalId) return;
    try {
      const journal = await getJournalByJournalId(journalId);
      setJournalDetails(journal);
    } catch (err) {
      console.error("저널 상세 정보 가져오기 실패:", err);
      // 에러 처리 로직 추가
    }
  }, [journalId]);

  // 저널 상세 정보 로드 useEffect
  useEffect(() => {
    fetchJournalDetails();
  }, [fetchJournalDetails]);

  // 서버에서 총 포인트 불러오기
  useEffect(() => {
    if (journalId) {
      getExercisePointByJournalId(journalId)
        .then((points) => setExercisePoints(points))
        .catch((err) => {
          console.error("운동 포인트 불러오기 실패:", err);
          setExercisePoints(0);
        });
    }
  }, [journalId]);

  // 타이머 시작 함수
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
  };

  // ⭐ 변경 사항: 포인트 계산 로직 (`getToastPoint`) 수정
  // 목표 시간을 달성했거나 초과했을 때 (time <= 0) 포인트를 지급합니다.
  // 추가 점수는 실제 운동한 총 시간을 기준으로 계산합니다.
  const getToastPoint = useCallback(() => {
    const totalSetSec = initialMinutes * 60 + initialSeconds;
    if (totalSetSec === 0) return 0; // 설정 시간이 0이면 0점

    // 타이머가 0이 되거나 음수로 넘어갔을 때만 포인트 지급
    if (time <= 0) {
      const elapsedTime = totalSetSec - time; // 실제 경과 시간 (초)
      return 3 + Math.floor(elapsedTime / 600); // 3점 기본 + 10분당 1점 추가
    }
    // 시간이 0보다 크면 (중간에 중단) 0점
    return 0;
  }, [initialMinutes, initialSeconds, time]);

  // ⭐ 변경 사항: Stop 버튼 클릭 시 로직 (`stopTimer`) 수정
  // 타이머 중지 및 포인트 기록 POST 요청을 처리합니다.
  const stopTimer = async () => {
    clearInterval(timerRef.current);
    setIsRunning(false);

    const totalSetSec = initialMinutes * 60 + initialSeconds;
    const currentPoint = getToastPoint(); // 수정된 포인트 계산 로직 사용

    // API 요청 조건: 획득 포인트가 0보다 클 때만 기록
    // 또는 설정 시간이 0이하면 기록하지 않음
    if (currentPoint <= 0 || totalSetSec <= 0) {
      // 포인트 획득 실패 또는 유효하지 않은 설정일 경우
      setSuccessToast(false); // 성공 토스트는 띄우지 않음
      setToast(true); // "타이머가 일시 정지되었습니다" 토스트 표시
      setTimeout(() => {
        setToast(false); // 토스트 숨김
      }, 1800); // 토스트 표시 시간
      return; // API 요청 없이 함수 종료
    }

    // 포인트 획득 성공 시
    try {
      // 시작 시간 추정: 현재 시간 - (실제 경과 시간)
      const elapsedTime = totalSetSec - time;
      const startTime = new Date(Date.now() - elapsedTime * 1000).toISOString();
      const endTime = new Date().toISOString(); // 종료 시간은 현재 시간
      const goalTime = initialMinutes * 60 + initialSeconds; // 목표 시간 (초)
      const isCompleted = time <= 0; // 목표 시간 달성 여부 (0이하이면 달성)

      const response = await createExerciseLogAPI(journalId, {
        startTime: startTime,
        endTime: endTime,
        goalTime: goalTime,
        isCompleted: isCompleted,
        exercisePoint: currentPoint,
      });
      console.log("운동 기록 및 포인트 서버 반영 성공:", response);

      setSuccessToast(true); // "집중 성공! 포인트를 획득했습니다" 토스트 표시
      setTimeout(() => {
        setSuccessToast(false); // 토스트 숨김
        resetTimer(); // 타이머 초기화
      }, 2000); // 토스트 표시 시간

      // 서버에서 총 포인트를 다시 불러와 UI 갱신
      getExercisePointByJournalId(journalId)
        .then((points) => setExercisePoints(points))
        .catch((err) => {
          console.error("운동 포인트 갱신 실패:", err);
          setExercisePoints(0);
        });
    } catch (err) {
      console.error("운동 기록 서버 반영 실패:", err);
      // API 호출 실패 시에도 타이머 초기화 및 필요 시 에러 토스트 표시
      setToast(true); // 예: "데이터 전송에 실패했습니다" 같은 메시지를 위한 토스트
      setTimeout(() => {
        setToast(false);
        resetTimer();
      }, 1800);
    }
  };

  // 타이머 리셋 함수
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(initialMinutes * 60 + initialSeconds);
    setInputMinutes(initialMinutes);
    setInputSeconds(initialSeconds);
    setToast(false); // 리셋 시 토스트 숨김
    setSuccessToast(false); // 리셋 시 성공 토스트 숨김
  };

  // 타이머 설정 저장
  const handleSaveTimerSetting = () => {
    const total = inputMinutes * 60 + inputSeconds;
    setTime(total > 0 ? total : 1); // 설정 시간이 0이면 최소 1초로 설정
    setInitialMinutes(inputMinutes);
    setInitialSeconds(inputSeconds);
    setShowTimerSetting(false);
    // 설정 저장 후에는 타이머를 다시 시작할 수 있도록 상태 초기화
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  // 타이머 설정 취소
  const handleCancelTimerSetting = () => {
    setInputMinutes(initialMinutes);
    setInputSeconds(initialSeconds);
    setShowTimerSetting(false);
  };

  // input 동기화 (타이머 시간이 변경될 때 input 필드 업데이트)
  useEffect(() => {
    setInputMinutes(Math.floor(time / 60));
    setInputSeconds(time % 60);
  }, [time]);

  // 컴포넌트 언마운트 시 setInterval 정리
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  // 타이머 경고/음수 상태 계산
  const isWarning = time <= 10 && time > 0;
  const isNegative = time < 0;

  // 타이머 설정 버튼 렌더링 함수
  const renderTimerSetButton = () => (
    <button
      className={styles["timer-set-btn"]}
      type="button"
      onClick={() => {
        if (!showTimerSetting) {
          setShowTimerSetting(true);
          setEditingField("minutes"); // 처음 열릴 때 분 입력 필드에 포커스
        }
      }}
      tabIndex={0}
    >
      <span className={styles["timer-set-icon"]} role="img" aria-label="타이머">
        🕒
      </span>
      {showTimerSetting ? (
        <>
          <input
            type="number"
            min="0"
            max="180"
            value={inputMinutes}
            onChange={(e) =>
              setInputMinutes(
                Math.max(0, Math.min(180, Number(e.target.value) || 0))
              )
            }
            className={styles["timer-set-input"]}
            style={{ width: 48, textAlign: "right" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveTimerSetting();
              if (e.key === "Escape") handleCancelTimerSetting();
              if (e.key === ":" || e.key === "Tab") setEditingField("seconds");
            }}
            autoFocus={editingField === "minutes"}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => setEditingField("minutes")}
          />
          :
          <input
            type="number"
            min="0"
            max="59"
            value={inputSeconds}
            onChange={(e) =>
              setInputSeconds(
                Math.max(0, Math.min(59, Number(e.target.value) || 0))
              )
            }
            className={styles["timer-set-input"]}
            style={{ width: 48, textAlign: "right" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveTimerSetting();
              if (e.key === "Escape") handleCancelTimerSetting();
              if (e.key === "Tab") setEditingField("minutes");
            }}
            autoFocus={editingField === "seconds"}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => setEditingField("seconds")}
          />
        </>
      ) : (
        <>
          {String(initialMinutes).padStart(2, "0")}:
          {String(initialSeconds).padStart(2, "0")}
        </>
      )}
    </button>
  );

  // 현재 편집 중인 입력 필드를 추적 (분 또는 초)
  const [editingField, setEditingField] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4fa", // 고정 단색 배경
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div className={styles["app-container"]} style={{ paddingTop: 78 }}>
        <Header />
        <header className={styles.header}>
          <h1>
            <span style={{ color: "#59739C" }}>{journalDetails?.nickname}</span>{" "}
            의 운동일지
          </h1>
          <div className={styles["header-right"]}>
            <button
              className={styles["icon-button"]}
              onClick={() => navigate(`/routines/${journalId}`)}
            >
              오늘의 습관 {">"}
            </button>
            <button
              className={styles["icon-button"]}
              onClick={() => navigate("/")}
            >
              홈 {">"}
            </button>
          </div>
        </header>

        <PointsSection exercisePoints={exercisePoints} />

        <div className={styles["focus-timer-card"]}>
          <p className={styles["card-title"]}>오늘의 집중</p>
          {renderTimerSetButton()}
          <TimerDisplay
            time={time}
            isWarning={isWarning}
            isNegative={isNegative}
          />
          <Controls
            time={time}
            isRunning={isRunning}
            startTimer={startTimer}
            stopTimer={stopTimer}
            resetTimer={resetTimer}
          />
        </div>

        <Toast
          toast={toast}
          successToast={successToast}
          getToastPoint={getToastPoint}
        />
      </div>
    </div>
  );
};
