import styles from "./JournalsPost.module.css";
import { Header } from "../../components/commonComponents/Header/index.jsx";
import { JournalPostContent } from "../../components/pagesComponents/journalsComponents/JournalPostContent/index.jsx";

export const JournalsPost = () => {
  return (
    <main className={styles.mainPageContainer}>
      <Header></Header>
      <div className={styles.contentContainer}>
        <JournalPostContent />
      </div>
    </main>
  );
};
