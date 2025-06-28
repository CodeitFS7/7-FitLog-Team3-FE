import dumbelClear from "../../../../assets/icons/dumbelClear.png";
import dumbelColor from "../../../../assets/icons/dumbelColor.png";
import styles from "./RoutineCheckMarkIcon.module.css";

export const RoutineCheckMarkIcon = ({ isCompleted }) => {
  const stampImg = isCompleted ? dumbelColor : dumbelClear;
  return (
    <img
      src={stampImg}
      alt={isCompleted ? "완료" : "미완료"}
      className={styles.dumbelIcon}
    />
  );
};
