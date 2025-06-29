import React, { useState, useEffect } from "react";
import { JournalCard } from "../../journalsComponents/JournalCard/index.jsx";
import { getRecentJournals } from "../../../../../utils/localStorageUtils.js";
import styles from "./RecentJournalsSection.module.css";
import { getJournalByJournalId } from "../../../../api/journals/journalsApi.js";

export const RecentJournalsSection = () => {
  const [recentJournals, setRecentJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJournals = async () => {
      setLoading(true);
      const storedJournals = getRecentJournals();
      const fetchedJournals = await Promise.all(
        storedJournals.map((j) => getJournalByJournalId(j.id))
      );
      // null 필터링 (fetch 실패했을 때)
      const validJournals = fetchedJournals.filter((j) => j !== null);
      setRecentJournals(validJournals);
      setLoading(false);
    };

    loadJournals();
  }, []);

  if (loading) {
    return (
      <section className={styles.recentJournalsSection}>
        <h2 className={styles.sectionTitle}>최근 조회한 운동일지</h2>
        <p className={styles.loadingMessage}>불러오는 중...</p>
      </section>
    );
  }

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

  return (
    <section className={styles.recentJournalsSection}>
      <h2 className={styles.sectionTitle}>최근 조회한 운동일지</h2>
      <div className={styles.recentJournalCardsGrid}>
        {recentJournals.map((journal) => (
          <JournalCard key={journal.id} journal={journal} />
        ))}
      </div>
    </section>
  );
};
