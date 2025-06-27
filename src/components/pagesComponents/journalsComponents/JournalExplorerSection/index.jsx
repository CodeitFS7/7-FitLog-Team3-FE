import React, { useState, useEffect, useCallback } from "react";
import styles from "./JournalExplorerSection.module.css";
import { getJournalsList } from "../../../../api/journals/journalsApi.js";
import { JournalSearchFilter } from "../JournalSearchFilter/index.jsx";
import { JournalCard } from "../JournalCard/index.jsx";
import { LoadMoreButton } from "../LoadMoreButton/index.jsx";
export const JournalExplorerSection = () => {
  const [journals, setJournals] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({
    keyword: "",
    orderBy: "newest",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJournals = useCallback(
    async (page, currentQueryParams, append = false) => {
      setLoading(true);
      setError(null);

      try {
        const response = await getJournalsList({
          page: page,
          pageSize: 6,
          keyword: currentQueryParams.keyword,
          orderBy: currentQueryParams.orderBy,
        });

        if (append) {
          setJournals((prevJournals) => [
            ...prevJournals,
            ...response.journals,
          ]);
        } else {
          setJournals(response.journals);
        }
        setTotalCount(response.totalCount);
      } catch (err) {
        console.error("저널 데이터 가져오기 실패:", err);
        setError("저널을 불러오는 데 실패했습니다.");
        setJournals([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // queryParams 또는 currentPage가 변경될 때마다 데이터 다시 가져오기
  useEffect(() => {
    fetchJournals(currentPage, queryParams, currentPage > 1);
  }, [currentPage, queryParams, fetchJournals]);

  // 검색/정렬 필터 변경 핸들러
  const handleFilterChange = (newKeyword, newOrderBy) => {
    setQueryParams({ keyword: newKeyword, orderBy: newOrderBy });
    setCurrentPage(1); // 필터/검색 변경 시 페이지를 1로 초기화
  };

  // 더보기 버튼 클릭 핸들러
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // 더보기 버튼 표시 여부 (현재 페이지의 저널 수가 전체 저널 수보다 적을 때)
  const hasMore = journals.length < totalCount;

  return (
    <section className={styles.journalExplorerSection}>
      <h2 className={styles.sectionTitle}>운동일지 둘러보기</h2>
      <JournalSearchFilter onFilterChange={handleFilterChange} />
      {loading && <p>로딩 중...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.journalCardsGrid}>
        {!loading && journals.length === 0 && !error && (
          <p>등록된 저널이 없거나 검색 결과가 없습니다.</p>
        )}
        {journals.map((journal) => (
          <JournalCard key={journal.id} journal={journal} /> // JournalCard에 journal 객체 전체 전달
        ))}
      </div>
      {!loading && hasMore && <LoadMoreButton onClick={handleLoadMore} />}
    </section>
  );
};
