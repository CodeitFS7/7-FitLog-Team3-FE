import { CheckTodayRoutines } from "../CheckTodayRoutines/index.jsx";
import React, { useState, useEffect } from "react";
import styles from "./TodayRoutineContent.module.css";
import { getJournalByJournalId } from "../../../../api/journals/journalsApi.js";
import arrowRight from "../../../../assets/icons/ic_arrow_right.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { PATH } from "../../../../../utils/path.js";
export const TodayRoutineContent = ({ journalId }) => {
  const [nickname, setNickname] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [loadingNickname, setLoadingNickname] = useState(true);
  const [nicknameError, setNicknameError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNickname = async () => {
      if (!journalId) {
        setLoadingNickname(false);
        return;
      }
      setLoadingNickname(true);
      setNicknameError(null);
      try {
        const journalData = await getJournalByJournalId(journalId);
        if (journalData && journalData.nickname) {
          setNickname(journalData.nickname);
        } else {
          setNickname("알 수 없는 사용자");
          setNicknameError("저널 닉네임을 찾을 수 없습니다.");
        }
      } catch (err) {
        setNicknameError(err.message);
        setNickname("알 수 없는 사용자");
      } finally {
        setLoadingNickname(false);
      }
    };

    fetchNickname();
  }, [journalId]); // journalId가 변경될 때마다 닉네임 다시 가져옴

  // 현재 시간을 주기적으로 업데이트하는 useEffect는 그대로 유지
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "오후" : "오전";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

      setCurrentTime(
        `${year}-${month}-${day} ${ampm} ${formattedHours}:${minutes}`
      );
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // 로딩 또는 오류 상태 처리
  if (loadingNickname) {
    return (
      <div className="containerWrapper">
        <p className="loadingMessage">닉네임 로딩 중...</p>
      </div>
    );
  }
  if (nicknameError) {
    return (
      <div className="containerWrapper">
        <p className="errorMessage">오류 발생: {nicknameError}</p>
      </div>
    );
  }

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLeft}>
          <h2 className={styles.headerTitle}>
            <span className={styles.nickname}>{nickname}</span>의 운동일지
          </h2>
          <p className={styles.currentTime}>
            현재시간 | <span className={styles.timeValue}>{currentTime}</span>
          </p>
        </div>
        <div className={styles.headerRight}>
          <button
            className={styles.headerBtn}
            onClick={() => navigate(PATH.journal.exerciseLogs(journalId))}
          >
            오늘의 운동
            <span>
              <img
                className={styles.arrowRightImg}
                src={arrowRight}
                alt="오른쪽 화살표"
              />
            </span>
          </button>
          <button
            className={styles.headerBtn}
            onClick={() => navigate(PATH.index())}
          >
            홈
            <span>
              <img
                className={styles.arrowRightImg}
                src={arrowRight}
                alt="오른쪽 화살표"
              />
            </span>
          </button>
        </div>
      </div>
      <CheckTodayRoutines journalId={journalId} />
    </div>
  );
};
