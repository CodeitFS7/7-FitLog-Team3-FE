import styles from "./RoutinesTable.module.css";
import { RoutineWeeklyChecks } from "../RoutineWeeklyChecks";
import { getWeeklyRoutinesStatus } from "../../../../api/routines/routinesApi.js";
import { useState, useCallback, useEffect } from "react";

export const RoutinesTable = ({ journalId }) => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const weekDays = ["월", "화", "수", "목", "금", "토", "일"];

  const fetchRoutineTableData = useCallback(async () => {
    if (!journalId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const today = new Date().toISOString().split("T")[0];
      const responseRoutines = await getWeeklyRoutinesStatus(journalId, today);
      setRoutines(responseRoutines);
    } catch (err) {
      console.error("습관 기록표 데이터 가져오기 실패: ", err);
    } finally {
      setLoading(false);
    }
  }, [journalId]);

  useEffect(() => {
    fetchRoutineTableData();
  }, [fetchRoutineTableData]);

  return (
    <div className={styles.routineTableContainer}>
      <h2 className={styles.title}>습관 기록표</h2>
      <div className={styles.tableHeader}>
        <span className={styles.blanckCell}></span>
        {weekDays.map((day) => (
          <span key={day} className={styles.headerCell}>
            {day}
          </span>
        ))}
      </div>
      <div className={styles.routinesList}>
        {loading ? (
          <p className={styles.loadingMessage}>습관 기록표 로딩 중...</p>
        ) : error ? (
          <p className={styles.errorMessage}>{error}</p>
        ) : routines.length === 0 ? (
          <>
            <p className={styles.noRoutineMessage}>아직 습관이 없어요</p>
            <p className={styles.noRoutineMessage}>
              오늘의 습관에서 나만의 운동 습관을 작성해보세요
            </p>
          </>
        ) : (
          routines.map((routine) => (
            <RoutineWeeklyChecks key={routine.id} routine={routine} />
          ))
        )}
      </div>
    </div>
  );
};
