import React, { useEffect } from "react"; // useState와 axios는 필요 없으므로 제거
import { Header } from "../../components/commonComponents/Header/index.jsx";
import { JournalDetailContent } from "../../components/pagesComponents/routinesComponents/JournalDetailContent/index.jsx";
import { useParams } from "react-router-dom";
import styles from "./JournalDetail.module.css";
import { addRecentJournal } from "../../../utils/localStorageUtils.js";

export const JournalDetail = () => {
  const { journalId } = useParams();

  useEffect(() => {
    if (journalId) {
      addRecentJournal({
        id: journalId,
      });
    }
  }, [journalId]);

  return (
    <div className={styles.detailPageContainer}>
      <Header />
      <div className={styles.mainContentWrapper}>
        <JournalDetailContent journalId={journalId} />
      </div>
    </div>
  );
};
