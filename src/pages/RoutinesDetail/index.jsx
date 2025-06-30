import { TodayRoutineContent } from "../../components/pagesComponents/routinesComponents/TodayRoutineContent/index.jsx";
import { Header } from "../../components/commonComponents/Header/index.jsx";
import { useParams } from "react-router-dom";
import styles from "./RoutinesDetail.module.css";

export const RoutinesDetail = () => {
  const { journalId } = useParams();
  return (
    <div className={styles.routnesDetailContainer}>
      <Header></Header>
      <div className={styles.contentContainer}>
        <TodayRoutineContent
          className={styles.todayRoutineContent}
          journalId={journalId}
        />
      </div>
    </div>
  );
};
