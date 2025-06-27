import React from "react";
import styles from "./LoadMoreButton.module.css";

/**
 * 더 많은 데이터를 불러오기 위한 버튼 컴포넌트입니다.
 * @param {object} props - 컴포넌트 props
 * @param {function} props.onClick - 버튼 클릭 시 실행될 콜백 함수입니다.
 */
export const LoadMoreButton = ({ onClick }) => {
  return (
    <button className={styles.loadMoreButton} onClick={onClick}>
      ▼ 더보기
    </button>
  );
};
