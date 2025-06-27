import React, { useState, useEffect } from "react";
import { JournalCard } from "../../journalsComponents/JournalCard/index.jsx";
import { getRecentJournals } from "../../../../../utils/localStorageUtils.js";
import styles from "./RecentJournalsSection.module.css";

export const RecentJournalsSection = () => {
  const [recentJournals, setRecentJournals] = useState([]);

  useEffect(() => {
    // 컴포넌트 마운트 시 LocalStorage에서 최근 조회한 저널 목록을 가져옵니다.
    const storedJournals = getRecentJournals();
    setRecentJournals(storedJournals);
  }, []);

  // 만약 조회한 저널이 없다면
  if (recentJournals.length === 0) {
    return (
      <section className={styles.recentJournalsSection}>
        <h2 className={styles.sectionTitle}>최근 조회한 운동일지</h2>
        <div className={styles.messageContainer}>
          <p className={styles.noRecentJournalsMessage}>
            아직 조회한 운동일지가 없습니다.
          </p>
        </div>
      </section>
    );
  }

  // 조회한 저널이 있다면 목록을 표시
  return (
    <section className={styles.recentJournalsSection}>
      <h2 className={styles.sectionTitle}>최근 조회한 운동일지</h2>
      <div className={styles.recentJournalCardsGrid}>
        {" "}
        {recentJournals.map((journal) => (
          <JournalCard key={journal.id} journal={journal} />
        ))}
      </div>
    </section>
  );
};
