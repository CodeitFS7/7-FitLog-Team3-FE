import { Header } from "../../components/commonComponents/Header/index.jsx";
import { JournalDetailContent } from "../../components/pagesComponents/routinesComponents/JournalDetailContent/index.jsx";
import { useParams } from "react-router-dom";
import styles from "./JournalDetail.module.css";
export const JournalDetail = () => {
  const { journalId } = useParams();
  return (
    <div className={styles.detailPageContainer}>
      <Header />
      <div className={styles.mainContentWrapper}>
        <JournalDetailContent journalId={journalId} />
      </div>
    </div>
  );
};
