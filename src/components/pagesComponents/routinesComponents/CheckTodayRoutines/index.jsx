import { useState, useEffect } from "react";
import {
  getWeeklyRoutinesStatus,
  updateCheckRoutineStatus,
} from "../../../../api/routines/routinesApi.js";
import { RoutineButton } from "../RoutineButton/index.jsx";
import RoutineModal from "../RoutineModal/index.jsx"; // ← 진짜 모달 컴포넌트 import
import styles from "./CheckTodayRoutines.module.css";

export const CheckTodayRoutines = ({ journalId }) => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDayKey = (date) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return days[date.getDay()];
  };

  const fetchRoutines = async () => {
    setLoading(true);
    setError(null);
    try {
      const today = new Date();
      const todayFormatted = today.toISOString().split("T")[0];
      const fetchedRoutines = await getWeeklyRoutinesStatus(
        journalId,
        todayFormatted
      );

      const currentDayKey = getDayKey(today);
      const processedRoutines = fetchedRoutines.map((routine) => ({
        id: routine.id,
        title: routine.title,
        isCompleted:
          (routine.weeklyCompletion &&
            routine.weeklyCompletion[currentDayKey]) ||
          false,
        weeklyCompletion: routine.weeklyCompletion,
      }));

      setRoutines(processedRoutines);
    } catch (err) {
      setError(err.message);
      setRoutines([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (journalId) {
      fetchRoutines();
    } else {
      setLoading(false);
      setError("Journal ID is missing.");
      setRoutines([]);
    }
  }, [journalId]);

  const handleRoutineToggle = async (routineId, newIsCompletedState) => {
    const now = new Date();
    const dateForRequestBody = now.toISOString().split("T")[0];
    const todayDayKey = getDayKey(now);

    setRoutines((prevRoutines) =>
      prevRoutines.map((routine) =>
        routine.id === routineId
          ? {
              ...routine,
              isCompleted: newIsCompletedState,
              weeklyCompletion: {
                ...routine.weeklyCompletion,
                [todayDayKey]: newIsCompletedState,
              },
            }
          : routine
      )
    );

    try {
      await updateCheckRoutineStatus(routineId, journalId, dateForRequestBody);
    } catch (err) {
      setError(err.message);
      setRoutines((prevRoutines) =>
        prevRoutines.map((routine) =>
          routine.id === routineId
            ? {
                ...routine,
                isCompleted: !newIsCompletedState,
                weeklyCompletion: {
                  ...routine.weeklyCompletion,
                  [todayDayKey]: !newIsCompletedState,
                },
              }
            : routine
        )
      );
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    fetchRoutines(); // 모달 닫을 때 다시 불러오기
  };

  return (
    <div className={styles.todayRoutineContainer}>
      <div className={styles.titleAndEditBtn}>
        <h3 className={styles.title}>오늘의 루틴</h3>
        <button className={styles.EditBtn} onClick={openModal}>
          목록 수정
        </button>
      </div>

      <div className={styles.todayRoutineListContainer}>
        {loading && (
          <p className={styles.loadingMessage}>루틴 목록을 불러오는 중...</p>
        )}
        {error && <p className={styles.errorMessage}>오류 발생: {error}</p>}
        {!loading && !error && routines.length === 0 && (
          <p className={styles.noContentMessage}>오늘의 루틴이 없습니다.</p>
        )}
        {!loading &&
          !error &&
          routines.length > 0 &&
          routines.map((routine) => (
            <RoutineButton
              key={routine.id}
              id={routine.id}
              isInitialCompleted={routine.isCompleted}
              onClick={handleRoutineToggle}
            >
              {routine.title}
            </RoutineButton>
          ))}
      </div>

      {isModalOpen && (
        <RoutineModal
          journalId={journalId}
          initialRoutines={routines}
          onClose={closeModal}
        />
      )}
    </div>
  );
};
