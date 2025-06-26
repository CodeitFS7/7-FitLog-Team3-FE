import React, { useState } from "react";
import styles from "./JournalSearchFilter.module.css"; // CSS 모듈
import searchIcon from "../../../../assets/images/icons/ic_search.svg";
/**
 * 저널 검색 및 정렬 필터 컴포넌트입니다.
 * @param {object} props - 컴포넌트 props
 * @param {function} props.onFilterChange - 필터가 변경될 때 호출될 콜백 함수 (인자: newKeyword, newOrderBy)
 */
export const JournalSearchFilter = ({ onFilterChange }) => {
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState("newest"); // 기본값 'newest'

  // 검색어 변경 핸들러
  const handleKeywordChange = (e) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    onFilterChange(newKeyword, orderBy);
  };

  // 정렬 기준 변경 핸들러
  const handleOrderByChange = (e) => {
    const newOrderBy = e.target.value;
    setOrderBy(newOrderBy);
    onFilterChange(keyword, newOrderBy);
  };

  return (
    <div className={styles.searchFilterContainer}>
      <div className={styles.searchInputContainer}>
        <img src={searchIcon} alt="검색 아이콘" className={styles.searchIcon} />
        <input
          type="text"
          placeholder="검색"
          value={keyword}
          onChange={handleKeywordChange}
          className={styles.searchInput}
        />
      </div>

      <select
        value={orderBy}
        onChange={handleOrderByChange}
        className={styles.orderBySelect}
      >
        <option className={styles.optionNewest} value="newest">
          최신순
        </option>
        <option className={styles.option} value="oldest">
          오래된순
        </option>
        <option className={styles.option} value="routinePointHighest">
          포인트 높은 순
        </option>
        <option className={styles.option} value="routinePointLowest">
          포인트 낮은 순
        </option>
      </select>
    </div>
  );
};
