import styels from "./Mainpage.module.css";
import { JournalSearchFilter } from "../components/pagesComponents/journalsComponents/JournalSearchFilter";
import { JournalExplorerSection } from "../components/pagesComponents/journalsComponents/JournalExplorerSection";
export const MainPage = () => {
  return (
    <div className={styels.container}>
      <JournalExplorerSection />
    </div>
  );
};
