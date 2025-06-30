import styles from "./MainPage.module.css";
import { Header } from "../../components/commonComponents/Header/index.jsx";
import { JournalExplorerSection } from "../../components/pagesComponents/journalsComponents/JournalExplorerSection/index.jsx";
import { RecentJournalsSection } from "../../components/pagesComponents/journalsComponents/RecentJournalsSection/index.jsx";
export const MainPage = () => {
  return (
    <main className={styles.mainPageContainer}>
      <Header></Header>
      <div className={styles.contentContainer}>
        <RecentJournalsSection />
        <JournalExplorerSection />
      </div>
    </main>
  );
};
