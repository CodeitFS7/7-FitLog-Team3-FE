import { useState, useEffect } from "react";
import {
  getWeeklyRoutinesStatus,
  updateCheckRoutineStatus,
} from "../../../../api/routines/routinesApi.js";
import { RoutineButton } from "../RoutineButton/index.jsx";
import styles from "./CheckTodayRoutines.module.css";

export const CheckTodayRoutines = ({ journalId }) => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDayKey = (date) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return days[date.getDay()];
  };

  useEffect(() => {
    const fetchRoutines = async () => {
      setLoading(true);
      setError(null);
      try {
        const today = new Date();
        const todayFormatted = today.toISOString().split("T")[0];

        // 주간 루틴 상태를 가져오는 API 호출
        const fetchedRoutines = await getWeeklyRoutinesStatus(
          journalId,
          todayFormatted
        );

        const currentDayKey = getDayKey(new Date());
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

  return (
    <div className={styles.todayRoutineContainer}>
      <div className={styles.titleAndEditBtn}>
        <h3 className={styles.title}>오늘의 루틴</h3>
        <button className={styles.EditBtn}>목록 수정</button>
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
    </div>
  );
};
