import React from "react";
import styles from "./PointDisplay.module.css";

/**
 * 하나의 포인트 지표 (이모지, 값, 단위)를 표시하는 컴포넌트입니다.
 * @param {object} props - 컴포넌트 props
 * @param {string} props.emoji - 표시할 이모지 문자열
 * @param {number} props.value - 표시할 숫자 값
 * @param {string} [props.unit] - 값 뒤에 붙는 단위 또는 텍스트
 */
export const PointDisplay = ({ emoji, value, unit, mode = "dark" }) => {
  return (
    <div
      className={`${styles.pointDisplayContainer} ${
        mode === "light" ? styles.lightMode : ""
      }`}
    >
      <span className={styles.emoji} role="img" aria-label="point-emoji">
        {emoji}
      </span>
      <p className={styles.value}>{value}</p>
      {unit && <span className={styles.unit}>{unit}</span>} {}
    </div>
  );
};
