import { RoutineCheckMarkIcon } from "../RoutineCheckMarkIcon";
import styles from "./RoutineWeeklyChecks.module.css";

export const RoutineWeeklyChecks = ({ routine }) => {
  const { title, weeklyCompletion } = routine;
  const dayKeys = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <div className={styles.routineRow}>
      <p className={styles.routineTitle}>{title}</p>
      <div className={styles.stampGroup}>
        {dayKeys.map((dayKey) => {
          const isCompleted = weeklyCompletion[dayKey];

          const containerClasses = `${styles.checkIconContainer} ${
            isCompleted
              ? styles[dayKey.toLowerCase()]
              : styles.incompleteBackgroundCell
          }`;

          return (
            <div className={containerClasses} key={dayKey}>
              <RoutineCheckMarkIcon isCompleted={isCompleted} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
