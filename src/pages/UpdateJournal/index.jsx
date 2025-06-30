import styles from "./UpdateJournal.module.css";
import { Header } from "../../components/commonComponents/Header/index.jsx";
import { UpdateJournalContent } from "../../components/pagesComponents/journalsComponents/UpdateJournalContent/index.jsx";
import { useParams } from "react-router-dom";
export const UpdateJournal = () => {
  const { journalId } = useParams();
  return (
    <main className={styles.mainPageContainer}>
      <Header></Header>
      <div className={styles.contentContainer}>
        <UpdateJournalContent journalId={journalId} />
      </div>
    </main>
  );
};
