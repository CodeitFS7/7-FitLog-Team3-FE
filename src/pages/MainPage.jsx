import styels from "./Mainpage.module.css";
import { Header } from "../components/commonComponents/Header/index.jsx";
import { JournalExplorerSection } from "../components/pagesComponents/journalsComponents/JournalExplorerSection";
export const MainPage = () => {
  return (
    <>
      <Header></Header>
      <div className={styels.container}>
        <JournalExplorerSection />
      </div>
    </>
  );
};
